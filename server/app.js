var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var passport = require('passport');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// var corsOptions = {
//   credentials: true,
//   origin: 'http://rowingkuramae.com:3000'
// };
// app.use(cors(corsOptions));

// CORS対策。どのオリジンからもAjaxリクエストを受け付ける
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://rowingkuramae.com:3000');
  res.header('Access-Control-Allow-Credentials', true);
  next();
}
app.use(allowCrossDomain);

//passportとセッション
app.use(session({
  secret: 'Tsubakuro',
  resave: true,
  saveUninitiailzed: true
}));
app.use(passport.initialize());
app.use(passport.session())

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
  res.render('error');
});

module.exports = app;
