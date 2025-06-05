const express = require('express');
const { body, validationResult } = require('express-validator');
const { chatController } = require('../controllers/chat');

const router = express.Router();

// Input validation middleware
const validateChatInput = [
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ max: 1000 })
    .withMessage('Message must be less than 1000 characters')
];

// Chat endpoint
router.post('/', validateChatInput, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    await chatController.handleChat(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router; 