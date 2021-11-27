const Joi = require('joi');
let courses = require('../dev-data/courses');
// HTTP verb requests
exports.getAllCourses = (req, res) => {
  res.status(200).send(courses);
};

exports.getCourse = (req, res) => {
  const courseId = Number(req.params.id);
  const course = courses.find((course) => course.id === courseId);
  if (!course)
    return res.status(404).send('The course with given ID was not found');

  res.status(200).send(course);
};
exports.createCourse = async (req, res) => {
  const schema = Joi.object({
    id: Joi.number(),
    name: Joi.string().min(3).required(),
    duration: Joi.number(),
  });

  const course = {
    id: courses.length + 1,
    name: req.body.name,
    duration: req.body.duration,
  };
  try {
    const value = await schema.validateAsync(course);
    courses.push(value);
    res.status(201).send(value);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
exports.updateCourse = (req, res) => {
  const courseId = Number(req.params.id);
  const updatedCourse = courses.find((course) => course.id === courseId);
  if (!updatedCourse) {
    return res.status(404).send('The course with given ID was not found');
  }
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    duration: Joi.number().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  updatedCourse.name = req.body.name;
  updatedCourse.duration = req.body.duration;
  res.status(200).send(updatedCourse);
};

exports.deleteCourse = (req, res) => {
  const courseId = Number(req.params.id);
  const course = courses.find((course) => course.id === courseId);
  if (!course) {
    return res.status(404).send('The course with given ID was not found');
  }
  courses = courses.filter((course) => course.id !== courseId);
  res.status(204).json({ status: 'success', data: null });
};
