const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

// Middleware to verify JWT token
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database to ensure they still exist
    const [users] = await pool.execute(
      'SELECT id, username, email FROM Users WHERE id = ?',
      [decoded.userId]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. User not found.'
      });
    }

    // Add user info to request object
    req.user = users[0];
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.'
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired.'
      });
    } else {
      console.error('Auth middleware error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error during authentication.'
      });
    }
  }
};

// Middleware to check if user is project member
const projectMemberMiddleware = async (req, res, next) => {
  try {
    const projectId = req.params.id || req.params.projectId;
    const userId = req.user.id;

    const [members] = await pool.execute(
      'SELECT * FROM ProjectMembers WHERE project_id = ? AND user_id = ?',
      [projectId, userId]
    );

    if (members.length === 0) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You are not a member of this project.'
      });
    }

    next();
  } catch (error) {
    console.error('Project member middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error checking project membership.'
    });
  }
};

// Middleware to check if user is project creator
const projectCreatorMiddleware = async (req, res, next) => {
  try {
    const projectId = req.params.id || req.params.projectId;
    const userId = req.user.id;

    const [projects] = await pool.execute(
      'SELECT created_by_user_id FROM Projects WHERE id = ?',
      [projectId]
    );

    if (projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.'
      });
    }

    if (projects[0].created_by_user_id !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only project creator can perform this action.'
      });
    }

    next();
  } catch (error) {
    console.error('Project creator middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error checking project ownership.'
    });
  }
};

module.exports = {
  authMiddleware,
  projectMemberMiddleware,
  projectCreatorMiddleware
};
