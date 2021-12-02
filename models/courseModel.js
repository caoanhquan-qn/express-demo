const mongoose = require('mongoose');
const { Schema } = mongoose;
const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  author: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
  },
  price: {
    type: Number,
  },
  tags: {
    type: [String],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  isPublished: Boolean,
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
