const Course = require('../models/courseModel');

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
  const { name, author, duration, price, tags, isPublished } = req.body;
  const createdCourse = {
    name,
    author,
    duration,
    price,
    tags,
    isPublished,
  };
  try {
    const course = new Course(createdCourse);
    const newCourse = await course.save();
    res.status(201).send(newCourse);
  } catch (err) {
    res.status(400).send(err.message);
  }
};
exports.updateCourse = async (req, res) => {
  const updatedCourse = await Course.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!updatedCourse) {
    return res.status(404).send('The course with given ID was not found');
  }
  res.status(200).send(updatedCourse);
};

exports.deleteCourse = async (req, res) => {
  const deletedCourse = await Course.findByIdAndDelete(req.params.id);
  if (!deletedCourse) {
    return res.status(404).send('The course with given ID was not found');
  }
  res.status(204).json({ status: 'success', data: null });
};
