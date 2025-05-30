require('dotenv').config();

module.exports = {
  port: process.env.PORT || 8000,
  environment: process.env.NODE_ENV || 'development',
  database: {
    url: process.env.DATABASE_URL,
  }
};