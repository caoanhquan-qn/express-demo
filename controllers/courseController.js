const Course = require('../models/courseModel');
const Joi = require('joi');

// HTTP verb requests
exports.getAllCourses = async (req, res) => {
  const courses = await Course.find();
  res.status(200).send(courses);
};

exports.getCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course)
    return res.status(404).send('The course with given ID was not found');

  res.status(200).send(course);
};
exports.createCourse = async (req, res) => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
      author: Joi.string().required(),
      price: Joi.number(),
      tags: Joi.array().min(1),
      isPublished: Joi.boolean(),
      date: Joi.date(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      throw error;
    }
    const course = new Course(req.body);
    const newCourse = await course.save();
    res.status(201).send(newCourse);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
exports.updateCourse = async (req, res) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return res.status(404).send('The course with given ID was not found');
  }
  try {
    const schema = Joi.object({
      name: Joi.string().min(3),
      author: Joi.string(),
      price: Joi.number(),
      tags: Joi.array().min(1),
      isPublished: Joi.boolean(),
      date: Joi.date(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      throw error;
    }
    course.set(req.body);
    const updateCourse = await course.save();
    res.status(200).send(updateCourse);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.deleteCourse = async (req, res) => {
  const deletedCourse = await Course.findByIdAndDelete(req.params.id);
  if (!deletedCourse) {
    return res.status(404).send('The course with given ID was not found');
  }
  res.status(204).json({ status: 'success', data: null });
};

exports.getShortListOfPublishedBackendCourses = async (req, res) => {
  const shortList = await Course.find({ isPublished: true, tags: 'backend' })
    .sort({ name: 1 })
    .select('name author');
  res.status(200).send(shortList);
};

exports.getShortListOfPublishedFrontendBackendCourses = async (req, res) => {
  const publishedCourses = await Course.find({
    isPublished: true,
  })
    .or([{ tags: 'frontend' }, { tags: 'backend' }])
    .sort({ price: -1 })
    .select('name author');
  res.status(200).send(publishedCourses);
};

exports.getFilteredList = async (req, res) => {
  const courses = await Course.find({ isPublished: true }).or([
    { price: { $gte: 15 } },
    { name: /by/i },
  ]);
  res.status(200).send(courses);
};
