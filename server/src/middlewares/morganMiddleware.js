// src/middlewares/morganMiddleware.js
import morgan from 'morgan';

const morganMiddleware = () => morgan('dev');

export default morganMiddleware;
