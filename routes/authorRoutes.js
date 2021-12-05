const express = require('express');
const authorRouter = express.Router();

const {
  getAllAuthors,
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require('../controllers/authorController');

authorRouter.route('/').get(getAllAuthors).post(createAuthor);
authorRouter
  .route('/:id')
  .get(getAuthor)
  .put(updateAuthor)
  .delete(deleteAuthor);

module.exports = authorRouter;
