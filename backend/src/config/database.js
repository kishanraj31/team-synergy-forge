const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/synergysphere';
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

const testConnection = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return true;
    }
    return await connectDB();
  } catch (error) {
    console.error('❌ Database connection test failed:', error.message);
    return false;
  }
};

const initializeDatabase = async () => {
  try {
    // Create indexes for better performance
    const User = require('../models/User');
    const Project = require('../models/Project');
    const Task = require('../models/Task');
    const Comment = require('../models/Comment');

    // Create indexes
    await User.createIndexes();
    await Project.createIndexes();
    await Task.createIndexes();
    await Comment.createIndexes();

    console.log('✅ Database indexes created successfully');
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    return false;
  }
};

module.exports = {
  connectDB,
  testConnection,
  initializeDatabase
};