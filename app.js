var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const session = require("express-session");
const dataBaseConfig = require("./config/database");
const passport = require("passport");
require("./config/passport")(passport);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userProductRouter = require('./routes/user_product');
var adminProductRouter = require('./routes/admin_product');
var userOrderRouter = require('./routes/user_orderitem');
var userCartRouter = require('./routes/user_cart');
var userOrderRouter = require('./routes/user_order');
var adminRouter = require('./routes/admin');

var app = express();

mongoose.connect(dataBaseConfig.connectionString)
let dbconnection = mongoose.connection;
dbconnection.once("open", () => { console.log("Connected to mongodb") });
dbconnection.on("error", () => { console.log("Failed to execute db command") });

//Session setup
app.use(session({
  secret: "sdaopfiuasdoifu",
  resave: false,
  saveUninitialized: false,
  cookie: {}
})); 
//Passport setup
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Router setup
app.get("*", (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', userProductRouter);
app.use('/admin/product', adminProductRouter);
app.use('/orderitem', userOrderRouter)
app.use('/cart', userCartRouter);
app.use('/orders', userOrderRouter);
app.use('/admin', adminRouter);



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
