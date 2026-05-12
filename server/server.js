const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(
  cors({
    origin: ["https://hopegrid-1.onrender.com"],
    credentials: true,
  })
);


app.use(express.json());

// API Routes
app.use('/api/resources', require('./routes/resources'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/reports', require('./routes/reports'));

// MongoDB Connection
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/relieflink';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected!'))
  .catch((err) => console.error('❌ DB Error:', err.message));

// Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).send('API is working!');
});

// Serve static assets in production
/*
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}
*/

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});














