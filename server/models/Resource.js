const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  type: { type: String, required: true },
  quantity: { type: Number, required: true },
  contact: { type: String, required: true },
  description: { type: String },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now } // ✅ Use 'createdAt' instead of 'timestamp'
});

module.exports = mongoose.model('Resource', resourceSchema);









