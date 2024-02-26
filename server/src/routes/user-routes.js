// src/routes/user-routes.js
import express from 'express';

import { login, register } from '../services/userService.js';

const router = express.Router();

router.post('/register', async (req, res, next) => {
  const { username, password, email, preferences } = req.body;
  try {
    const user = await register(username, password, email, preferences);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const { user, token } = await login(username, password);
    res.json({ user, token });
  } catch (error) {
    next(error);
  }
});

export default router;
