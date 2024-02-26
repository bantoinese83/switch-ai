// src/middlewares/bodyParserMiddleware.js
import bodyParser from 'body-parser';
import express from 'express';

const bodyParserMiddleware = () => {
  const router = express.Router();
  router.use(bodyParser.json());
  router.use(bodyParser.urlencoded({ extended: true }));
  return router;
};

export default bodyParserMiddleware;
