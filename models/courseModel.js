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
    // this only works on create and save
    required: function () {
      return this.isPublished;
    },
  },
  tags: {
    type: [String],
    validate: {
      validator: function (val) {
        return val && val.length > 0;
      },
    },
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  isPublished: Boolean,
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
