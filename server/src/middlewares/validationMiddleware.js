// src/middlewares/validationMiddleware.js
import { validationResult } from 'express-validator';

const validationMiddleware = (req, res, next) => {
  // Run the validation
  const result = validationResult(req);
  if (!result.isEmpty()) {
    // If there are validation errors, send a 400 Bad Request response with the errors
    return res.status(400).json({ errors: result.array() });
  }

  // If there are no validation errors, proceed to the next middleware
  next();
};

export default validationMiddleware;
