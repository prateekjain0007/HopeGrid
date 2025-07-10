const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

// POST - Create a new resource
router.post('/', async (req, res) => {
  try {
    const { type, quantity, contact, location, description } = req.body;

    if (!type || !quantity || !contact || !location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newResource = new Resource({ type, quantity, contact, location, description });
    const saved = await newResource.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('❌ Error saving resource:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET - Get all resources
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

// PUT - Update a resource by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { type, quantity, contact, location, description } = req.body;

  if (!type || !quantity || !contact || !location) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const updatedResource = await Resource.findByIdAndUpdate(
      id,
      { type, quantity, contact, location, description },
      { new: true }
    );

    if (!updatedResource) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    res.json(updatedResource);
  } catch (err) {
    console.error('❌ Update failed:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE - Delete a resource by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const found = await Resource.findById(id);
    if (!found) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    await found.deleteOne();
    res.json({ message: 'Resource deleted successfully' });
  } catch (err) {
    console.error('❌ Delete failed:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
















