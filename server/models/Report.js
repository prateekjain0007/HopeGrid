const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  disasterType: {
    type: String,
    required: true,
    enum: ['Flood', 'Earthquake', 'Fire', 'Cyclone', 'Landslide'],
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['Low', 'Moderate', 'High'],
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Report', ReportSchema);










