const express = require('express');
const router = express.Router();
const Criminal = require('../models/Criminal'); // Correct relative path to the Criminal model

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next(); // Proceed if the user is authenticated
    }
    res.redirect('/auth/login'); // Redirect to login page if not authenticated
}

// Render the home.ejs on the root path
router.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

// Index route (to render index.ejs after login)
router.get('/index', isAuthenticated, (req, res) => {
    res.render('index', { title: 'Index', message: null });
});

// Search for a criminal by ID
router.post('/criminal/search', isAuthenticated, async (req, res) => {
    const { criminalId } = req.body;
    
    try {
        // Ensure that criminalId is treated as a string when querying MongoDB
        const criminal = await Criminal.findOne({ criminalId: String(criminalId) });
        
        if (!criminal) {
            return res.status(404).render('index', { 
                title: 'Index', 
                message: 'Criminal not found. Please try again.' 
            });
        }

        // Render the display.ejs with the criminal data
        res.render('display', { criminal });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
