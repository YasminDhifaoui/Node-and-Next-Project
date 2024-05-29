const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Handler for registering a new user
async function registerUser(req, res) {
    const { name, email, password, role, avatar } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ error: "Account already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = new User({
        name,
        email,
        password: hash,
        role,
        avatar
    });

    try {
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error registering new user" });
    }
}

//login handler
async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Authentication failed. User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Authentication failed. Wrong password.' });
        }

        // Set user info in session or create a JWT token
        req.session.user = {
            id: user._id,
            email: user.email,
            role: user.role
        };

        // Redirect to the blog list page
        res.status(302).setHeader('Location', '/blogs').end();
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ error: 'Server error during authentication.' });
    }
}


// Handler for accessing user route
function getUsers(req, res) {
    console.log('User route accessed');
    res.json({ message: 'Users endpoint hit' });
}

module.exports = {
    registerUser,
    loginUser,
    getUsers
};
