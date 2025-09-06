const express = require('express');
const { register, login, getProfile, updateProfile } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validation');
const { authLimiter } = require('../middleware/security');

const router = express.Router();

// Apply rate limiting to auth routes
router.use(authLimiter);

// Public routes
router.post('/register', validate(schemas.register), register);
router.post('/login', validate(schemas.login), login);

// Protected routes
router.use(authMiddleware); // All routes below require authentication

router.get('/profile', getProfile);
router.put('/profile', validate(schemas.register), updateProfile);

module.exports = router;
