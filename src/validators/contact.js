const { body } = require('express-validator');

exports.validate = [
  body('first_name')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 2, max: 100 }).withMessage('First name must be between 2 and 100 characters'),
  
  body('last_name')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Last name must be between 2 and 100 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail()
    .isLength({ max: 255 }).withMessage('Email cannot exceed 255 characters'),
  
  body('phone')
    .trim()
    .optional()
    .isLength({ min: 5, max: 50 }).withMessage('Phone number must be between 5 and 50 characters'),
  body('country')
    .trim()
    .notEmpty().withMessage('Country is required')
    .isLength({ min: 2, max: 100 }).withMessage('Country must be between 2 and 100 characters'),
  
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10 }).withMessage('Message must be at least 10 characters long')
];