// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config(); // for environment variables

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Routes
const homeRoutes = require('./routes/home');
const authRoutes = require('./routes/auth');
app.use('/', homeRoutes);
app.use('/auth', authRoutes);

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
