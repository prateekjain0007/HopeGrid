const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const reportRoutes = require('./routes/reportRoutes'); // ✅ Correct import

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Mount routes correctly
app.use('/api/reports', reportRoutes); // for submitting and viewing reports
app.use('/api/alerts', reportRoutes);  // for filtering/displaying alerts

// Root test route
app.get('/', (req, res) => {
  res.send('ReliefLink API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server listening at http://localhost:${PORT}`);
});



