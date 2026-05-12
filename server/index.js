const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
<<<<<<< HEAD
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/user', require('./routes/user'));
app.use('/api/reports', require('./routes/reports'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected!"))
  .catch(err => console.error("❌ DB Error:", err.message));

app.get('/api/health', (req, res) => {
  res.send('API is working!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));

=======

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/resources', require('./routes/resources'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/reports', require('./routes/reportRoutes')); // ✅ fixed name

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://https://hopegrid-5.onrender.com:27017/relieflink';
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected!"))
  .catch(err => console.error("❌ DB Error:", err.message));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).send('API is working!');
});
>>>>>>> acd0c62eb6564427fc7f82c63773fae65fcfef3e

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


