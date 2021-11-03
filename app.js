const mongoose = require('mongoose');

const formData = require("express-form-data");
var createError = require('http-errors');
var express = require('express');
const os = require("os");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Adds availability of env variables to hide DB data.
const dotenv = require("dotenv");
dotenv.config();

var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');

var cors = require('cors')

var app = express();
app.use(cors());

// Connect to MongoDB through Mongoose
const DB = `mongodb+srv://admin:BloggerPro77!@cluster0.ryr0c.mongodb.net/dev-blogger?retryWrites=true&w=majority`; // Should be replaced with an environment variable

//console.log(DB);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware required for reading form data below.

const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
};

// parse data with connect-multiparty. 
app.use(formData.parse(options));
// delete from the request all empty files (size == 0)
app.use(formData.format());
// change the file objects to fs.ReadStream 
app.use(formData.stream());
// union the body and the files
app.use(formData.union());

// ^ Middleware required for reading form data above.

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/posts', postsRouter);

app.use('*', (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "You queried a route that doesn't exist!"
  })
})

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
  //res.render('error');
});

module.exports = app;
