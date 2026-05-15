const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

/* =========================
   CORS
========================= */

// TEMPORARY: allow all origins while testing
// Later you can restrict this to your frontend URL
app.use(cors());

/* =========================
   MIDDLEWARE
========================= */

app.use(express.json());

/* =========================
   ROUTES
========================= */

app.use('/api/resources', require('./routes/resources'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/reports', require('./routes/reports'));

/* =========================
   MONGODB CONNECTION
========================= */

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI is missing in environment variables');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected!');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

/* =========================
   HEALTH CHECK
========================= */

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is working!',
  });
});

/* =========================
   ROOT ROUTE
========================= */

app.get('/', (req, res) => {
  res.send('HopeGrid Backend Running ✅');
});

/* =========================
   START SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});








