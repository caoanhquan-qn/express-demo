const mongoose = require('mongoose');
const { Schema } = mongoose;
const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  // referencing a document
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: [true, 'A course must belong to at least an author'],
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

courseSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author',
  });
  next();
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
