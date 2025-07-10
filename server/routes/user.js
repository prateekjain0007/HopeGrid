const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/profile', auth, (req, res) => {
  res.json({ message: 'Secure profile route', user: req.user });
});

module.exports = router;
