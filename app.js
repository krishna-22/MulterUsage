var createError = require('http-errors');
// No Concept of sessions and cookies here in tokenisation
//body of token contains _id of  particular user in user schema
//instead of basic auth, use bearer token auth
//open postamn tool and type localhost:3000/dishes  by post     body of post is one object from db.json file 
//we will get dishes without authentication as it is not controlled on get method but only on post,put and delete
// signup info should be in req.body as json
//if u get token in login.. you type- bearer {token}. in authorisation header of req for delete methods on dishes and on controlled methods
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var authenticate = require('./authenticate');
var logger = require('morgan');
var config = require('./config');
var session = require('express-session');
var FileStore = require('session-file-store')(session);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const uploadRouter = require('./routes/uploadRouter');

var dishRouter = require('./routes/dishRouter')
var leaderRouter = require('./routes/leaderRouter')
var parameterRouter = require('./routes/leadersparameters')
const mongoose = require('mongoose');
const Dishes = require('./models/dishes');
mongoose.connect(config.mongoUrl).then((db)=>{
  console.log('connected correctly to server');
},(err)=>{console.log(err)});
var app = express();
// for https redirecting if its coming to http port


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('12345-67890-09876-54321'));



app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);



app.use(express.static(path.join(__dirname, 'public')));


app.use('/dishes',dishRouter)
app.use('/leaders',leaderRouter)
app.use('/imageUpload',uploadRouter);
app.use('/leaders:id',parameterRouter)

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
