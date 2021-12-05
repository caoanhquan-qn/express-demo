const mongoose = require('mongoose');
const { Schema } = mongoose;
const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  website: {
    type: String,
  },
});

const Author = mongoose.model('Author', authorSchema);
module.exports = Author;
