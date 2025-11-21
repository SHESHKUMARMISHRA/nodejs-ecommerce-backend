const express = require('express');
const apiRoutes = require('./routes/api');

const app = express();

// Built-in body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/v1', apiRoutes);

// Health Check
app.get('/', (req, res) => res.json({ status: 'ok' }));

// Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

module.exports = app;
