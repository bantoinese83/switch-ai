// src/routes/gemini-routes.js
import express from 'express';

import rateLimitMiddleware from '../middlewares/rateLimitMiddleware.js';
import geminiApiResponse from '../utils/geminiService.js';
import { getChatHistory } from '../services/chatService.js';



const router = express.Router();

router.post('/generate-gemini-response', rateLimitMiddleware, async (req, res, next) => {
  try {
    const userInput = req.body.userInput;
    const userId = req.body.userId;
    const sessionId = req.body.sessionId;

    // Get the chat history
    const chatHistory = await getChatHistory(userId, sessionId);

    // Include the chat history in the input to the AI model
    const botResponse = await geminiApiResponse(userInput, chatHistory);

    res.json({ botResponse });
  } catch (error) {
    next(error);
  }
});

export default router;
