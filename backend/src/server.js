const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// Import middleware
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { 
  generalLimiter, 
  helmetConfig, 
  corsOptions, 
  requestLogger 
} = require('./middleware/security');

// Import database
const { connectDB, testConnection, initializeDatabase } = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');
const commentRoutes = require('./routes/comments');

const app = express();
const PORT = process.env.PORT || 3002;

// Security middleware
app.use(helmetConfig);
app.use(cors(corsOptions));
app.use(generalLimiter);

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(requestLogger);
}

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'SynergySphere API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint to prevent 404 errors
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'SynergySphere API - Use the frontend at http://localhost:3000',
    api_docs: `http://localhost:${PORT}/api`,
    health_check: `http://localhost:${PORT}/health`
  });
});

// API routes
app.use('/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/comments', commentRoutes);

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'SynergySphere API',
    version: '1.0.0',
    endpoints: {
      auth: {
        'POST /auth/register': 'Register new user',
        'POST /auth/login': 'Login user',
        'GET /auth/profile': 'Get user profile (protected)'
      },
      projects: {
        'POST /api/projects': 'Create new project (protected)',
        'GET /api/projects': 'Get user projects (protected)',
        'GET /api/projects/:id': 'Get project details (protected)',
        'POST /api/projects/:id/members': 'Add project member (protected, creator only)'
      },
      tasks: {
        'POST /api/tasks/projects/:id/tasks': 'Create task (protected)',
        'GET /api/tasks/projects/:id/tasks': 'Get project tasks (protected)',
        'GET /api/tasks/my-tasks': 'Get my assigned tasks (protected)',
        'PUT /api/tasks/:id': 'Update task (protected)',
        'DELETE /api/tasks/:id': 'Delete task (protected)'
      },
      comments: {
        'POST /api/comments/projects/:id/messages': 'Create comment (protected)',
        'GET /api/comments/projects/:id/messages': 'Get project comments (protected)',
        'GET /api/comments/recent': 'Get recent comments (protected)',
        'GET /api/comments/:id': 'Get single comment (protected)',
        'PUT /api/comments/:id': 'Update comment (protected)',
        'DELETE /api/comments/:id': 'Delete comment (protected)'
      }
    }
  });
});

// 404 handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    const dbConnected = await connectDB();
    if (!dbConnected) {
      console.warn('⚠️  Database connection failed. Server will start in limited mode.');
      console.warn('📝 To enable full functionality, please:');
      console.warn('   1. Install and start MongoDB');
      console.warn('   2. Update backend/.env with correct database credentials');
      console.warn('   3. Restart the server');
    } else {
      // Initialize database
      const dbInitialized = await initializeDatabase();
      if (!dbInitialized) {
        console.warn('⚠️  Database initialization failed. Server will start in limited mode.');
      } else {
        console.log('✅ Database connected and initialized successfully');
      }
    }

    // Start HTTP server
    app.listen(PORT, () => {
      console.log(`🚀 SynergySphere API server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 API Documentation: http://localhost:${PORT}/api`);
      console.log(`❤️  Health Check: http://localhost:${PORT}/health`);
      if (!dbConnected) {
        console.log(`⚠️  Database: Not connected (limited functionality)`);
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled Rejection:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

// Start the server
startServer();