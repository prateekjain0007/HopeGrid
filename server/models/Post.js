const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    coordinates: {
      lat: {
        type: Number,
        default: 0,
      },
      lng: {
        type: Number,
        default: 0,
      },
    },
    details: {
      quantity: {
        type: String,
        required: true,
      },
      contact: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        default: '',
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resource', resourceSchema);



