import express from 'express';
import morgan from 'morgan';

import CONFIGURATION from '../src/config/config.js';
import logger from '../src/logger/index.js';
import {
  authenticateJwt,
  bodyParserMiddleware,
  corsMiddleware,
  errorHandlerMiddleware,
  helmetMiddleware,
  notFoundMiddleware,
  rateLimitMiddleware,
  validationMiddleware,
} from '../src/middlewares/index.js';
import chatRoutes from '../src/routes/chat-routes.js';
import geminiRoutes from '../src/routes/gemini-routes.js';
import openaiRoutes from '../src/routes/openai-routes.js';
import userRoutes from '../src/routes/user-routes.js';
import { pool } from './db/database.js';
import { displayAsciiArt, showLoading } from './utils/startup.js';

const app = express();

app.use(corsMiddleware);
app.use(helmetMiddleware);
app.use(morgan('combined'));
app.use(bodyParserMiddleware);
app.use(rateLimitMiddleware);
app.use(authenticateJwt);
app.use(validationMiddleware);

console.log(`Attempting to start server on port ${CONFIGURATION.server.port}...`);

console.log(displayAsciiArt);

console.log('Initializing...');
showLoading();

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Switch AI' });
  logger.info('Welcome to Switch AI');
});

app.use('/users', userRoutes);
app.use('/chats', chatRoutes);
app.use('/openai', openaiRoutes);
app.use('/gemini', geminiRoutes);

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

let serverInstance;

async function checkDatabaseConnection() {
  try {
    await pool.query('SELECT NOW()');
    console.log('Database connection established.');
    logger.info('Database connection established.');
    return true;
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    logger.error('Failed to connect to the database:', err);
    return false;
  }
}

async function startServer() {
  const dbConnected = await checkDatabaseConnection();
  if (!dbConnected) {
    console.error('Failed to connect to the database. Server not started.');
    return;
  }

  serverInstance = app.listen(CONFIGURATION.server.port, () => {
    console.log(`Server is running on port ${CONFIGURATION.server.port}`);
    logger.info(`Server is running on port ${CONFIGURATION.server.port}`);
  });
}

startServer().catch(err => {
  logger.error('Error starting server:', err);
  process.exit(1);
});

function shutdown() {
  console.time('ServerShutdown');
  if (serverInstance) {
    serverInstance.close(() => {
      logger.info('Server shut down successfully.');
      console.timeEnd('ServerShutdown');
      process.exit(0);
    });
  } else {
    console.error('Server was not running.');
    console.timeEnd('ServerShutdown');
    process.exit(1);
  }
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('uncaughtException', err => {
  logger.error('Unhandled exception:', err);
  shutdown();
});
process.on('unhandledRejection', err => {
  logger.error('Unhandled rejection:', err);
  shutdown();
});

export default app;
