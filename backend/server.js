require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const discoverRoutes = require('./routes/discoverRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', discoverRoutes);

// Health check / root route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    project: 'Coy Discover API',
    version: '1.0.0',
    endpoints: {
      feed: 'GET /api/feed',
      swipe: 'POST /api/swipe',
      matches: 'GET /api/matches',
      reset: 'POST /api/reset',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Coy Discover Backend running on http://localhost:${PORT}`);
});
