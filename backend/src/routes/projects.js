const express = require('express');
const { body } = require('express-validator');
const { createProject, getProjects, getProjectById, addMember, deleteProject } = require('../controllers/projectController');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Validation rules
const createProjectValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Project name must be between 1 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters')
];

const addMemberValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email')
];

// Routes
router.post('/', createProjectValidation, createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/:id/members', addMemberValidation, addMember);
router.delete('/:id', deleteProject);

module.exports = router;