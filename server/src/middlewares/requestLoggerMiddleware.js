// src/middlewares/requestLoggerMiddleware.js
const requestLoggerMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
};

export default requestLoggerMiddleware;
