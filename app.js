const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
const mongoose = require('mongoose');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');



var ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) return next();
    else res.redirect('/login');
};


// require router scripts
const indexRouter = require('./routes/index');
const searchRouter = require('./routes/search');
const aboutRouter = require('./routes/about');
const createRouter = require('./routes/create');
const detailsRouter = require('./routes/details');
const createAccessoryRouter = require('./routes/createAccessory');
const attachAccessoryRouter = require('./routes/attachAccessory');
const editRouter = require('./routes/edit');
const deleteRouter = require('./routes/delete');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');

const app = express();

// hide your mongo connection constiables
require('dotenv').config();
mongoose.connect(process.env.DB_URI,  {
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
    .then( (res) => console.log('db connected'))
    .catch((err) => console.log(err));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials("./views/partials");
hbs.registerHelper('isEqual', (a, b) => {return a === b;});



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//initialize passport, session
app.use(require('express-session')({
    secret: process.env.EXP_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));


// unprotected routes
app.use('/', indexRouter);  //index, login, register
app.use('/search', searchRouter);
app.use('/about', aboutRouter);
app.use('/details', detailsRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

// protected routes
app.use(ensureAuthenticated);

app.use('/create', createRouter);
app.use('/accessory/create', createAccessoryRouter);
app.use('/accessory/attach', attachAccessoryRouter);
app.use('/edit', editRouter);
app.use('/delete', deleteRouter);


// passport config
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



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
