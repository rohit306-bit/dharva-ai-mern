const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// ═══════════════════════════════════════════
// INITIALIZE
// ═══════════════════════════════════════════

const app = express();
connectDB();

// ═══════════════════════════════════════════
// MIDDLEWARE
// ═══════════════════════════════════════════

// Security headers
app.use(helmet());

// CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging (dev only)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: (process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX || 100,
  message: {
    success: false,
    error: 'Too many requests, please try again later.',
  },
});
app.use('/api/', limiter);

// ═══════════════════════════════════════════
// ROUTES
// ═══════════════════════════════════════════

// Health check
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Dharva AI API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// API Routes — Marketing
app.use('/api/v1/products', require('./routes/products'));
app.use('/api/v1/launches', require('./routes/launches'));
app.use('/api/v1/docs', require('./routes/docs'));
app.use('/api/v1/contact', require('./routes/contact'));
app.use('/api/v1/pricing', require('./routes/pricing'));

// API Routes — SaaS Platform
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/ai-systems', require('./routes/aiSystems'));
app.use('/api/v1/impact', require('./routes/impact'));
app.use('/api/v1/compliance', require('./routes/compliance'));
app.use('/api/v1/audit', require('./routes/audit'));
app.use('/api/v1/regulatory', require('./routes/regulatory'));

// ═══════════════════════════════════════════
// SERVE REACT IN PRODUCTION
// ═══════════════════════════════════════════

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
  });
}

// ═══════════════════════════════════════════
// ERROR HANDLING
// ═══════════════════════════════════════════

app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`,
  });
});

// ═══════════════════════════════════════════
// START SERVER
// ═══════════════════════════════════════════

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════╗
  ║                                          ║
  ║   ⚡  DHARVA AI SYSTEM — API Server      ║
  ║                                          ║
  ║   🌍  Port:    ${PORT}                      ║
  ║   🔧  Mode:    ${process.env.NODE_ENV || 'development'}             ║
  ║   📡  Health:  /api/v1/health            ║
  ║                                          ║
  ╚══════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('unhandledRejection', (err) => {
  console.error(`\x1b[31m✖ Unhandled Rejection: ${err.message}\x1b[0m`);
  server.close(() => process.exit(1));
});
