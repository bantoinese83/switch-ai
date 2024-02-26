// src/middlewares/corsMiddleware.js
import cors from 'cors';

const corsOptions = {
  origin(origin, callback) {
    const whitelist = ['http://localhost:4000', 'http://localhost:3000'];
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // This allows cookies to be sent with requests
};

const corsMiddleware = () => cors(corsOptions);

export default corsMiddleware;
