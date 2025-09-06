const express = require('express');
const {
  createProject,
  getProjects,
  getProject,
  addMember,
  removeMember,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { authMiddleware, projectMemberMiddleware, projectCreatorMiddleware } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Project CRUD routes
router.post('/', validate(schemas.project), createProject);
router.get('/', getProjects);
router.get('/:id', projectMemberMiddleware, getProject);
router.put('/:id', projectCreatorMiddleware, validate(schemas.project), updateProject);
router.delete('/:id', projectCreatorMiddleware, deleteProject);

// Project member management
router.post('/:id/members', projectCreatorMiddleware, validate(schemas.addMember), addMember);
router.delete('/:id/members/:memberId', projectCreatorMiddleware, removeMember);

module.exports = router;
