const mongoose = require('mongoose');

const criminalSchema = new mongoose.Schema({
    criminalId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dob: { type: String, required: true },
    age: { type: Number, required: true },
    alias: { type: String, required: true },
    crimes: { type: String, required: true },
    lastKnownLocation: { type: String, required: true }
});

const Criminal = mongoose.model('Criminal', criminalSchema);

module.exports = Criminal;
