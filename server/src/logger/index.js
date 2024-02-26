// src/logger/index.js
import winston from 'winston';

const logger = winston.createLogger({
  // logger configuration
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'switch-ai' },
  transports: [
    // log file for errors
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // log file for combined logs
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

export default logger;
