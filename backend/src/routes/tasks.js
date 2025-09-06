const express = require('express');
const {
  createTask,
  getProjectTasks,
  getTask,
  updateTask,
  deleteTask,
  getMyTasks,
  getTasksByStatus
} = require('../controllers/taskController');
const { authMiddleware, projectMemberMiddleware } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Task routes
router.post('/projects/:id/tasks', projectMemberMiddleware, validate(schemas.task), createTask);
router.get('/projects/:id/tasks', projectMemberMiddleware, getProjectTasks);
router.get('/projects/:id/tasks/status', projectMemberMiddleware, getTasksByStatus);
router.get('/my-tasks', getMyTasks);
router.get('/:id', getTask);
router.put('/:id', validate(schemas.taskUpdate), updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
