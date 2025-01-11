const mongoose = require('mongoose');

// Define User Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Export the User model
module.exports = mongoose.model('User', UserSchema);
