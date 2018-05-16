var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 新增
var passport = require('passport');
var session = require('express-session');


var indexRouter = require('./routes/index');
var api = require('./routes/api');
var app = express();
// 新增
var auth = require('./routes/auth')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 新增
app.use(session({secret: 'sessionsecret'}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/api', api);
// 下面新增路由
app.use('/auth',auth)



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
