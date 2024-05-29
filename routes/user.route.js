const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

// User routes
router.get('/', controller.getUsers);

// Middleware for checking if user is logged in
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    // Return a 401 Unauthorized response with JSON if not authenticated
    res.status(401).json({ error: 'User is not authenticated. Please login.' });
}

router.get('/blog', isAuthenticated, (req, res) => {
    // Your blog logic here adjusted for JSON
    res.json({ message: "Welcome to the blog!" });
});

router.get('/signup', (req, res) => {
    // Redirect to /signup handled by Next.js; no server-side rendering needed
    res.json({ message: "Please proceed to the signup page." });
});

router.post('/register', controller.registerUser);

router.get('/login', (req, res) => {
    // Redirect to /login handled by Next.js; no server-side rendering needed
    res.json({ message: "Please proceed to the login page." });
});

router.post('/login', controller.loginUser);

// logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Logout Error:", err);
            return res.status(500).json({ error: 'Failed to logout.' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out successfully.' });
    });
});

module.exports = router;
