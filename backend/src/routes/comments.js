const express = require('express');
const { body } = require('express-validator');
const { 
  createComment, 
  getProjectComments, 
  getRecentComments, 
  getCommentById, 
  updateComment, 
  deleteComment 
} = require('../controllers/commentController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Validation rules
const createCommentValidation = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Content must be between 1 and 1000 characters'),
  body('parentComment')
    .optional()
    .isMongoId()
    .withMessage('Invalid parent comment ID')
];

const updateCommentValidation = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Content must be between 1 and 1000 characters')
];

// Routes
router.post('/projects/:id/messages', createCommentValidation, createComment);
router.get('/projects/:id/messages', getProjectComments);
router.get('/recent', getRecentComments);
router.get('/:id', getCommentById);
router.put('/:id', updateCommentValidation, updateComment);
router.delete('/:id', deleteComment);

module.exports = router;