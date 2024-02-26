// src/db/database.js
import pkg from 'pg';

import logger from '../logger/index.js';
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

const executeQuery = (text, params, callback) => {
  logger.info(`Executing query: ${text}`);
  logger.info(`With parameters: ${JSON.stringify(params)}`);
  return pool.query(text, params, callback);
};

export { executeQuery, pool };
