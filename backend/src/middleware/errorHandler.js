// Global error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let error = {
    success: false,
    message: 'Internal Server Error',
    statusCode: 500
  };

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = {
      success: false,
      message: 'Validation Error',
      errors: message,
      statusCode: 400
    };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = {
      success: false,
      message: 'Invalid token',
      statusCode: 401
    };
  }

  if (err.name === 'TokenExpiredError') {
    error = {
      success: false,
      message: 'Token expired',
      statusCode: 401
    };
  }

  // MySQL errors
  if (err.code === 'ER_DUP_ENTRY') {
    const field = err.sqlMessage.includes('username') ? 'username' : 'email';
    error = {
      success: false,
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
      statusCode: 409
    };
  }

  if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    error = {
      success: false,
      message: 'Referenced record not found',
      statusCode: 400
    };
  }

  if (err.code === 'ER_ROW_IS_REFERENCED_2') {
    error = {
      success: false,
      message: 'Cannot delete record as it is referenced by other records',
      statusCode: 400
    };
  }

  // Custom error with status code
  if (err.statusCode) {
    error.statusCode = err.statusCode;
    error.message = err.message;
  }

  // Log error for debugging
  console.error(`Error ${error.statusCode}: ${error.message}`);

  res.status(error.statusCode).json({
    success: error.success,
    message: error.message,
    ...(error.errors && { errors: error.errors }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

// 404 handler for undefined routes
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

module.exports = {
  errorHandler,
  notFound
};
