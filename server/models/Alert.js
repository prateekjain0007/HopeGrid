const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  type: String,
  location: String,
  severity: Number,
  description: String,
  coordinates: {
    lat: Number,
    lng: Number
  }
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);


