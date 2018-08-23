const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const messagesRouter = require('./routes/messages');
const reportsRouter = require('./routes/reports');

const dbConfig = require('./config/database');
const mailerConfig = require('./config/mailer');


const app = express();

// Connect to the database
mongoose.connect(dbConfig.db).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log("Couldn't connect to the database => ", err);
})

// Initiize passport.js
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
})


// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/messages', messagesRouter);
app.use('/reports', reportsRouter);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
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
});

module.exports = app;
