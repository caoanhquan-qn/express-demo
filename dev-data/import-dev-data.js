const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('../models/courseModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_LOCAL;
mongoose
  .connect(DB)
  .then(() => console.log('DB connected successfully'))
  .catch((err) => console.log(err.message));

// READ FILE
const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/exercise-data.json`, 'utf-8')
);

// IMPORT DATA INTO DATABASE
const importData = async () => {
  try {
    await Course.create(courses);
    console.log('Import data into DB successfully');
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Course.deleteMany();
    console.log('Delete all data in DB successfully');
  } catch (error) {
    console.log(error.message);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
}
if (process.argv[2] === '--delete') {
  deleteData();
}
console.log(process.argv);
