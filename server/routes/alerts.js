const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// GET /api/alerts - Fetch all reports as alerts
router.get('/', async (req, res) => {
  try {
    const filters = {};
    if (req.query.location) filters.location = { $regex: req.query.location, $options: 'i' };
    if (req.query.disasterType) filters.disasterType = req.query.disasterType;

    const alerts = await Report.find(filters).sort({ createdAt: -1 });
    res.json(alerts);
  } catch (err) {
    console.error("❌ Error fetching alerts:", err.message);
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

module.exports = router;



