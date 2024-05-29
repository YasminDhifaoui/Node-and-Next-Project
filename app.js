const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const morgan = require('morgan');

const session = require('express-session');
const blogRoutes = require('./routes/blogRoutes');
const userRouter = require("./routes/user.route");

// Set up Next.js
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
    const app = express();
    const dbURI = 'mongodb://localhost:27017/myappdb';

    mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Database connected');
            app.listen(3000, () => console.log('Server started on http://localhost:3000'));
        })
        .catch(err => console.error('Database connection failed', err));

    // Middlewares
    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(morgan('dev'));
    app.use(session({
        secret: '04',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, maxAge: 3600000 }
    }));

    // API Routes
    app.use('/api/users', userRouter);
    app.use('/api/blogs', blogRoutes);

    // Session check middleware
    app.use((req, res, next) => {
        if (req.session.user) {
            res.locals.user = req.session.user;
        } else {
            res.locals.user = null;
        }
        next();
    });

    // Handle 404 for API with JSON response
    app.use('/api/*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });

    // Next.js handles all other routes
    app.all('*', (req, res) => {
        return handle(req, res);
    });

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });
});
