const Resource = require('../models/Resource');

// @desc    Create a new resource
// @route   POST /api/resources
// @access  Public
exports.createResource = async (req, res) => {
  try {
    const resource = new Resource(req.body);
    const saved = await resource.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error creating resource:", err.message);
    res.status(500).json({ error: 'Failed to save resource' });
  }
};

// @desc    Get all resources
// @route   GET /api/resources
// @access  Public
exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    console.error("❌ Error fetching resources:", err.message);
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
};

