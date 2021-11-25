const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

let courses = [
  {
    id: 1,
    name: 'Node JS The Complete Guide',
  },
  {
    id: 2,
    name: 'Typescript The Complete Guide',
  },
  {
    id: 3,
    name: 'Microservices The Complete Guide',
  },
];

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});
app.get('/api/courses', (req, res) => {
  res.status(200).send(courses);
});
app.get('/api/courses/:id', (req, res) => {
  const courseId = Number(req.params.id);
  const course = courses.find((course) => course.id === courseId);
  if (!course)
    return res.status(404).send('The course with given ID was not found');

  res.status(200).send(course);
});
app.get('/api/courses/:year/:month', (req, res) => {
  res.send(req.params);
});

app.post('/api/courses', async (req, res) => {
  const schema = Joi.object({
    id: Joi.number(),
    name: Joi.string().min(3).required(),
  });

  const course = { id: courses.length + 1, name: req.body.name };
  try {
    const value = await schema.validateAsync(course);
    courses.push(value);
    res.status(201).send(value);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.put('/api/courses/:id', (req, res) => {
  const courseId = Number(req.params.id);
  const updatedCourse = courses.find((course) => course.id === courseId);
  if (!updatedCourse) {
    return res.status(404).send('The course with given ID was not found');
  }
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  updatedCourse.name = req.body.name;
  res.status(200).send(updatedCourse);
});

app.delete('/api/courses/:id', (req, res) => {
  const courseId = Number(req.params.id);
  const course = courses.find((course) => course.id === courseId);
  if (!course) {
    return res.status(404).send('The course with given ID was not found');
  }
  courses = courses.filter((course) => course.id !== courseId);
  res.status(204).json({ status: 'success', data: null });
});
module.exports = app;
