const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Import the User model
const router = express.Router();

// Login GET route
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login', message: null }); // Always pass 'message', even if null
});

// Login POST route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.render('login', { title: 'Login', message: 'Invalid username or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('login', { title: 'Login', message: 'Invalid username or password.' });
        }

        // Set user in session
        req.session.user = user;  // Save user in session

        // Redirect to /index upon successful login
        res.redirect('/index');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Register GET route
router.get('/register', (req, res) => {
    res.render('register', { title: 'Register', message: null }); // Always pass 'message', even if null
});

// Register POST route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render('register', { title: 'Register', message: 'Username already exists. Please try another one.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password: hashedPassword,
        });

        await newUser.save();

        // After successful registration, redirect to login page
        res.redirect('/auth/login');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy(); // Destroy the session
    res.redirect('/auth/login'); // Redirect to login page
});

module.exports = router;
