import executeQuery from '../db/index.js';
import logger from '../logger/index.js';

// This class will be used to interact with the `chats` table in the database
class Chats {
  static async create(userId, sessionId, message, response) {
    try {
      const res = await executeQuery(
        'INSERT INTO chats (user_id, session_id, message, response) VALUES ($1, $2, $3, $4) RETURNING *',
        [userId, sessionId, message, response],
      );
      return res.rows[0];
    } catch (error) {
      logger.error('Error creating chat message:', error);
      throw error; // Rethrow or handle as needed
    }
  }

  static async getAllByUserIdAndSessionId(userId, sessionId) {
    try {
      const res = await executeQuery('SELECT * FROM chats WHERE user_id = $1 AND session_id = $2', [
        userId,
        sessionId,
      ]);
      return res.rows;
    } catch (error) {
      logger.error('Error fetching chats:', error);
      throw error; // Rethrow or handle as needed
    }
  }

  // Add other methods as needed, following similar patterns
}

export default Chats;
