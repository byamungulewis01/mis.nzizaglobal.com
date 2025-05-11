/**
 * Global error handling middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
exports.errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  
  // Default error status and message
  const status = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  
  // Prisma specific errors
  if (err.code) {
    switch (err.code) {
      case 'P2002':
        return res.status(409).json({
          success: false,
          message: 'A record with this data already exists',
          error: err.meta?.target || message
        });
      case 'P2025':
        return res.status(404).json({
          success: false,
          message: 'Record not found',
          error: message
        });
    }
  }
  
  // Send error response
  res.status(status).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};