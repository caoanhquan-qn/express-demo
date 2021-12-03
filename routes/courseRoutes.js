const express = require('express');
const courseRouter = express.Router();
const {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getShortListOfPublishedBackendCourses,
  getShortListOfPublishedFrontendBackendCourses,
  getFilteredList,
} = require('../controllers/courseController');
courseRouter.route('/').get(getAllCourses).post(createCourse);
courseRouter
  .route('/short-published-backend')
  .get(getShortListOfPublishedBackendCourses);
courseRouter
  .route('/short-published-frontend-backend')
  .get(getShortListOfPublishedFrontendBackendCourses);
courseRouter.route('/filtered-list').get(getFilteredList);
courseRouter
  .route('/:id')
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = courseRouter;
