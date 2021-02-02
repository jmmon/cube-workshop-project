const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const indexRouter = require('./routes/index');
const searchRouter = require('./routes/search');
const aboutRouter = require('./routes/about');
const createRouter = require('./routes/create');
const detailsRouter = require('./routes/details');
const createAccessoryRouter = require('./routes/createAccessory');
const attachAccessoryRouter = require('./routes/attachAccessory');

const editRouter = require('./routes/edit');
const deleteRouter = require('./routes/delete');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');

const cookieRouter = require('./routes/cookie');

const app = express();

// hide your mongo connection constiables
require('dotenv').config();
mongoose.connect(process.env.DB_URI,  {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then( (res) => console.log('db connected'))
    .catch((err) => console.log(err));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials("./views/partials");
hbs.registerHelper('isEqual', function (expectedValue, value) {
    return value === expectedValue;
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/about', aboutRouter);
app.use('/details', detailsRouter);
app.use('/create', createRouter);
app.use('/accessory/create', createAccessoryRouter);
app.use('/accessory/attach', attachAccessoryRouter);

app.use('/edit', editRouter);
app.use('/delete', deleteRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.use('/cookie', cookieRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('404');
});

module.exports = app;
