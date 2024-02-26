// src/routes/openai-routes.js
import express from 'express';

import rateLimitMiddleware from '../middlewares/rateLimitMiddleware.js';
import generateCompletion from '../utils/openaiService.js';
const router = express.Router();

router.post('/generate-openai-response', rateLimitMiddleware, async (req, res, next) => {
  const { message } = req.body;
  if (!message || typeof message !== 'string') {
    return next(new Error('Invalid input'));
  }
  try {
    const botResponse = await generateCompletion(message);
    res.json({ botResponse });
  } catch (error) {
    next(error);
  }
});

export default router;
