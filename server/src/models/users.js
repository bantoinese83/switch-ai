// src/models/user.js
import bcrypt from 'bcrypt';

import executeQuery from '../db/index.js';

class User {
  static async create(username, password, email, preferences) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const res = await executeQuery(
      'INSERT INTO users (username, password, email, preferences) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, hashedPassword, email, preferences],
    );
    return res.rows[0];
  }

  static async findByUsername(username) {
    const res = await executeQuery('SELECT * FROM users WHERE username = $1', [username]);
    return res.rows[0];
  }

  // Add other methods as needed
}

export default User;
