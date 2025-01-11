// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session'); // For managing user sessions
require('dotenv').config(); // For environment variables

const app = express();

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Session setup (cookie-based session)
app.use(session({
    secret: 'your-secret-key', // Change this to a random secret for security
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set true if using https
}));

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Routes
const homeRoutes = require('./routes/home');  // For home and index routes
const authRoutes = require('./routes/auth');  // For authentication (login/register)
app.use('/', homeRoutes);  // Root path serves home.ejs
app.use('/auth', authRoutes);  // Use authentication routes

// Database connection
const dbURI = process.env.MONGODB_URI; // Get connection string from .env
mongoose.connect(dbURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Database connection error:', err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
