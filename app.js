require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const hbs = require("hbs");
const hbsutils = require("hbs-utils")(hbs);



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const privateRouter = require('./routes/private');
const routinesRouter = require('./routes/routines')

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
    keepAlive: true,
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    useUnifiedTopology: true
  });
  
  app.use(
    session({
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 24 * 60 * 60
      }),
      secret: process.env.API_SECRET,
      resave: true,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      }
    })
  );
  app.use(cookieParser());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbsutils.registerPartials(path.join(__dirname, "/views/partials"));
hbsutils.registerWatchedPartials(path.join(__dirname, "/views/partials"));
/* hbs.registerHelper('inArray', function (elem, list) {
  if (list.indexOf(elem) > -1) {
    return '<h1>hola</h1>'
  } 
  return false;
}); */

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.cookieSession());
app.use(express.static(path.join(__dirname, 'public')));



// Router:
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter); 
app.use('/private', privateRouter);
app.use('/routines', routinesRouter);

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
