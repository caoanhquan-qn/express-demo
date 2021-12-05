const Joi = require('joi');
const Author = require('../models/authorModel');

// HTTP verb requests

exports.getAllAuthors = async (req, res) => {
  const authors = await Author.find();
  res.status(200).send(authors);
};
exports.getAuthor = async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (!author) {
    return res.status(404).send('The author with given ID was not found');
  }
  res.status(200).send(author);
};

exports.createAuthor = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      bio: Joi.string(),
      website: Joi.string(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      throw error;
    }
    const author = new Author(req.body);
    const newAuthor = await author.save();
    res.status(201).send(newAuthor);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.updateAuthor = async (req, res) => {
  const author = await Author.findById(req.params.id);
  if (!author) {
    return res.status(404).send('The author with given ID was not found');
  }
  try {
    const schema = Joi.object({
      name: Joi.string(),
      bio: Joi.string(),
      website: Joi.string(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      throw error;
    }
    author.set(req.body);
    const updatedAuthor = await author.save();
    res.status(200).send(updatedAuthor);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
exports.deleteAuthor = async (req, res) => {
  const author = await Author.findByIdAndDelete(req.params.id);
  if (!author) {
    return res.status(404).send('The author with given ID was not found');
  }
  res.status(204).json({ status: 'success', data: null });
};
