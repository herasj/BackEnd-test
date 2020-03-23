const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const logger = require('morgan');
const createError = require('http-errors');
const app = express();

//Basic express middleware 
app.use(logger('dev'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Routes
const authRouter = require('../routes/authorization');
const usersRouter = require('../routes/users');
const messageRouter = require('../routes/messages');

//Define routes
app.use('/users', usersRouter);
app.use('/authorization', authRouter);
app.use('/messages', messageRouter);


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