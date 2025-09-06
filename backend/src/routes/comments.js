const express = require('express');
const {
  createComment,
  getProjectComments,
  getComment,
  updateComment,
  deleteComment,
  getRecentComments
} = require('../controllers/commentController');
const { authMiddleware, projectMemberMiddleware } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Comment routes
router.post('/projects/:id/messages', projectMemberMiddleware, validate(schemas.comment), createComment);
router.get('/projects/:id/messages', projectMemberMiddleware, getProjectComments);
router.get('/recent', getRecentComments);
router.get('/:id', getComment);
router.put('/:id', validate(schemas.comment), updateComment);
router.delete('/:id', deleteComment);

module.exports = router;
