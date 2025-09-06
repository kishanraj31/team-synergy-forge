const Joi = require('joi');

// Validation schemas
const schemas = {
  // User registration validation
  register: Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .messages({
        'string.alphanum': 'Username must contain only alphanumeric characters',
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username must not exceed 30 characters',
        'any.required': 'Username is required'
      }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
      })
  }),

  // User login validation
  login: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'Password is required'
      })
  }),

  // Project creation validation
  project: Joi.object({
    name: Joi.string()
      .min(1)
      .max(255)
      .required()
      .messages({
        'string.min': 'Project name cannot be empty',
        'string.max': 'Project name must not exceed 255 characters',
        'any.required': 'Project name is required'
      }),
    description: Joi.string()
      .allow('')
      .optional()
      .messages({
        'string.base': 'Description must be a string'
      })
  }),

  // Task creation validation
  task: Joi.object({
    title: Joi.string()
      .min(1)
      .max(255)
      .required()
      .messages({
        'string.min': 'Task title cannot be empty',
        'string.max': 'Task title must not exceed 255 characters',
        'any.required': 'Task title is required'
      }),
    description: Joi.string()
      .allow('')
      .optional()
      .messages({
        'string.base': 'Description must be a string'
      }),
    assigned_to_user_id: Joi.number()
      .integer()
      .positive()
      .optional()
      .messages({
        'number.base': 'Assigned user ID must be a number',
        'number.integer': 'Assigned user ID must be an integer',
        'number.positive': 'Assigned user ID must be positive'
      }),
    due_date: Joi.date()
      .iso()
      .optional()
      .messages({
        'date.format': 'Due date must be in ISO format (YYYY-MM-DD)'
      }),
    status: Joi.string()
      .valid('To-Do', 'In Progress', 'Done')
      .optional()
      .messages({
        'any.only': 'Status must be one of: To-Do, In Progress, Done'
      })
  }),

  // Task update validation
  taskUpdate: Joi.object({
    title: Joi.string()
      .min(1)
      .max(255)
      .optional()
      .messages({
        'string.min': 'Task title cannot be empty',
        'string.max': 'Task title must not exceed 255 characters'
      }),
    description: Joi.string()
      .allow('')
      .optional()
      .messages({
        'string.base': 'Description must be a string'
      }),
    assigned_to_user_id: Joi.number()
      .integer()
      .positive()
      .allow(null)
      .optional()
      .messages({
        'number.base': 'Assigned user ID must be a number',
        'number.integer': 'Assigned user ID must be an integer',
        'number.positive': 'Assigned user ID must be positive'
      }),
    due_date: Joi.date()
      .iso()
      .allow(null)
      .optional()
      .messages({
        'date.format': 'Due date must be in ISO format (YYYY-MM-DD)'
      }),
    status: Joi.string()
      .valid('To-Do', 'In Progress', 'Done')
      .optional()
      .messages({
        'any.only': 'Status must be one of: To-Do, In Progress, Done'
      })
  }),

  // Comment validation
  comment: Joi.object({
    content: Joi.string()
      .min(1)
      .required()
      .messages({
        'string.min': 'Comment content cannot be empty',
        'any.required': 'Comment content is required'
      }),
    parent_comment_id: Joi.number()
      .integer()
      .positive()
      .optional()
      .messages({
        'number.base': 'Parent comment ID must be a number',
        'number.integer': 'Parent comment ID must be an integer',
        'number.positive': 'Parent comment ID must be positive'
      })
  }),

  // Add project member validation
  addMember: Joi.object({
    user_id: Joi.number()
      .integer()
      .positive()
      .required()
      .messages({
        'number.base': 'User ID must be a number',
        'number.integer': 'User ID must be an integer',
        'number.positive': 'User ID must be positive',
        'any.required': 'User ID is required'
      })
  })
};

// Validation middleware factory
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errorMessages
      });
    }
    
    req.body = value; // Use validated and sanitized data
    next();
  };
};

module.exports = {
  schemas,
  validate
};
