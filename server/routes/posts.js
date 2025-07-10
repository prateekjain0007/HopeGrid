const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');

// @route   GET /api/alerts
// @desc    Get alerts with optional filtering and sorting
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { location, type, sort } = req.query;

    // Build filter object
    const filter = {};
    if (location) {
      filter.location = { $regex: location, $options: 'i' }; // Case-insensitive match
    }
    if (type) {
      filter.type = { $regex: type, $options: 'i' }; // Case-insensitive match
    }

    // Build sort options
    let sortOption = {};
    if (sort === 'latest') {
      sortOption.createdAt = -1;
    } else if (sort === 'severity') {
      sortOption.severity = -1;
    }

    // Fetch alerts
    const alerts = await Alert.find(filter).sort(sortOption);
    res.status(200).json(alerts);

  } catch (err) {
    console.error("❌ Error fetching alerts:", err.message);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

module.exports = router;




