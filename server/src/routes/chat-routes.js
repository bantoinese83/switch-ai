// src/routes/chat-routes.js
import express from 'express';

import authenticateJwt from '../middlewares/authenticateJwt.js';
import { addChatMessage, getChatsByUserIdAndSessionId } from '../services/chatService.js';
const router = express.Router();

router.get('/:userId', authenticateJwt, async (req, res, next) => {
  try {
    const chats = await getChatsByUserIdAndSessionId(req.params.userId);
    res.json(chats);
  } catch (error) {
    next(error);
  }
});

router.post('/add', authenticateJwt, async (req, res, next) => {
  const { userId, message, response } = req.body;
  try {
    const chat = await addChatMessage(userId, message, response);
    res.json(chat);
  } catch (error) {
    next(error);
  }
});

export default router;
