// src/userService.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/users.js';

const secretKey = process.env.JWT_SECRET || 'your-secret-key';

async function register(username, password, email, preferences) {
  return await User.create(username, password, email, preferences);
}

async function login(username, password) {
  const user = await User.findByUsername(username);
  if (!user) {
    throw new Error('User not found');
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  // User is authenticated, generate a JWT
  const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

  return { user, token };
}

export { login, register };
