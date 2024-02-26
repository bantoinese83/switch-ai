import winston from 'winston';

import Chat from '../models/chats.js';

async function addChatMessage(userId, sessionId, message, response) {
  if (!userId || !message || !response) {
    throw new Error('Invalid input');
  }
  try {
    // Save the user's message
    await Chat.create(userId, sessionId, message, 'user');
    // Save the AI's response
    return await Chat.create(userId, sessionId, response, 'ai');
  } catch (error) {
    winston.error(`Error in addChat: ${error.message}`);
    throw error;
  }
}

async function getChatsByUserIdAndSessionId(userId, sessionId) {
  if (!userId) {
    throw new Error('Invalid input'); // The caller will catch this
  }
  try {
    return await Chat.getAllByUserIdAndSessionId(userId, sessionId);
  } catch (error) {
    winston.error(`Error in getChatsByUserId: ${error.message}`);
    throw error; // Re-throw the error for external handling
  }
}

async function getChatHistory(userId, sessionId) {
  if (!userId) {
    throw new Error('Invalid input');
  }
  try {
    return await Chat.getAllByUserIdAndSessionId(userId, sessionId);
  } catch (error) {
    winston.error(`Error in getChatsByUserId: ${error.message}`);
    throw error;
  }
}

export { addChatMessage, getChatsByUserIdAndSessionId, getChatHistory};
