// src/middlewares/notFoundMiddleware.js
const notFoundMiddleware = (req, res) => {
  res.status(404).send({ error: 'Not found' });
};

export default notFoundMiddleware;
