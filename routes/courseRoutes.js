const express = require('express');
const courseRouter = express.Router();
const {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');
courseRouter.route('/').get(getAllCourses).post(createCourse);
courseRouter
  .route('/:id')
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = courseRouter;
