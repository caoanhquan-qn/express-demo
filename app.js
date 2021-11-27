const express = require('express');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const login = require('./controllers/loginController');
const auth = require('./controllers/authController');
const courseRouter = require('./routes/courseRoutes');
const homeRouter = require('./routes/homeRoute');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(helmet());

console.log(`App name: ${config.get('name')}`);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

// Custom middleware
app.use(login);
app.use(auth);

app.use('/', homeRouter);
app.use('/api/courses', courseRouter);

module.exports = app;
