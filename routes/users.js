var express = require('express');
const { check, validationResult } = require('express-validator');
var router = express.Router();
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const User = require("../schemas/users");
const passport = require("passport");
const Order = require("../schemas/orders");



const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect("/users/login");
  }
  else {
    next();
  }
}

const isNotLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    /// alert message how?
    res.redirect("/");
  }
  else {
    next();
  }
}


// GET Register form  
// POST Register form 
router.route('/register').get(isNotLoggedIn, (req, res, next) => {
  res.render('register_form', { title: 'ShopX | Register User' });
}).post([
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
  check('email', 'Email is required')
    .isEmail()
    .custom( async (val, {req,loc,path})=>{
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        throw new Error("Email Already Exists!")
      } else {
        return val;
      }
    }),
  check('password', 'Password is required')
    .custom((val, { req, loc, path }) => {
      if (val != req.body.passwordConfirm) {
        throw new Error("Password don't match")
      } else {
        return val;
      }
    })
], (req, res, next) => {
  
  var errors = validationResult(req);
  console.log(errors);

  if (!errors.isEmpty()) {
    req.session.errors = errors;
    req.session.success = false;
    res.render('register_form', { title: 'ShopX | Register User', errors: errors.array() });
  } else {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email
    });
    bcryptjs.genSalt(10, (error, salt) => {
      bcryptjs.hash(req.body.password, salt, (error, passwordHash) => {
        if (error) {
          console.log(JSON.stringify(error));
        } else {
          newUser.password = passwordHash;
          newUser.save((error) => {
            if (error) {
              console.log(JSON.stringify(error));
            }
            else {
              res.redirect("/users/login");
            }
          })
        }
      })
    });
  }
});

// GET Login form 
// POST Login form 
router.route('/login').get(isNotLoggedIn, function (req, res, next) {
  res.render('login_form');
}).post([
  check("email")
    .isEmail()
    .withMessage("Email is required"),
  check("password", "Password is required")
    .notEmpty()
],(req, res, next) => {
  var errors = validationResult(req);
  if (errors.isEmpty()) {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/users/login",
      failureMessage: true
    })(req, res, next);
  }
  else {
    res.render('login_form', { title: 'Not implemented: POST Login Form', errors: errors.array() });
  }
});


router.route('/logout').get(isLoggedIn, function (req, res, next) {
  req.logOut((error) => {
    if (error) {
      return next(error);
    }
    res.redirect("/users/login");
  })
})



module.exports = router;

