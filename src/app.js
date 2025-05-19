const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const { errorHandler } = require('./middlewares/errorHandler');
const routes = require('./routes');
const corsOptions = require('./config/cors');

const app = express();

// Middleware
app.use(helmet({
    contentSecurityPolicy: false // Disable CSP for development
}));
app.use(cors(corsOptions));
app.use(express.json());

// Use Morgan only in development
if (process.env.NODE_ENV === 'development') {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve coming soon page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'coming-soon.html'));
});

// API Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Resource not found'
    });
});

module.exports = app;