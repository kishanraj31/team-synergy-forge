const express = require('express');
const { body } = require('express-validator');
const { createTask, getProjectTasks, updateTask, deleteTask, getMyTasks } = require('../controllers/taskController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Validation rules
const createTaskValidation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
  body('assignee')
    .optional()
    .isMongoId()
    .withMessage('Invalid assignee ID'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid due date format')
];

const updateTaskValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters'),
  body('assignee')
    .optional()
    .isMongoId()
    .withMessage('Invalid assignee ID'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Invalid due date format'),
  body('status')
    .optional()
    .isIn(['To-Do', 'In Progress', 'Done'])
    .withMessage('Status must be one of: To-Do, In Progress, Done')
];

// Routes
router.post('/projects/:id/tasks', createTaskValidation, createTask);
router.get('/projects/:id/tasks', getProjectTasks);
router.get('/my-tasks', getMyTasks);
router.put('/:id', updateTaskValidation, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;