const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// @desc   Get all reports (view reports)
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reports' });
  }
});

// ✅ @desc   Use same reports as alerts
router.get('/alerts', async (req, res) => {
  try {
    const alerts = await Report.find().sort({ createdAt: -1 });
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch alerts' });
  }
});

// @desc   Submit a new report
router.post('/', async (req, res) => {
  try {
    const report = new Report(req.body);
    const saved = await report.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;














