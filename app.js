const mongoose = require("mongoose");
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./src/routes/index');
const usersRouter = require('./src/routes/users');
const clientRouter = require('./src/routes/clientRoute');
const ordersRouter = require('./src/routes/ordersRoute');

const app = express();
const cors = require('cors');
require("dotenv").config();

const port = process.env.PORT || 8000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// use parsing Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Db connection
mongoose.connect(process.env.MONGO_CONNECT_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("DB CONNECTED");
}).catch((e) => {
  console.log("Unable to connect to DB", e);
});

//export MONGO_CONNECT_URL=mongodb://username:password@localhost:27017/mydatabase

// using routes
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/clientRoute', clientRouter);
app.use('/api/ordersRoute', ordersRouter);

// starting serverc
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

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