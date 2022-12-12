var express = require('express');
const { check, validationResult } = require('express-validator');
var router = express.Router();
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const User = require("../schemas/users");
const passport = require("passport");
const Order = require("../schemas/orders");



const isLoggedIn = (req, res, next)=> {
  if (!req.isAuthenticated()) {
      res.redirect("/users/login");
  }
  else {
      next();
  }
}

const isNotLoggedIn = (req, res, next)=> {
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
router.route('/register').get(isNotLoggedIn,(req, res, next) => {
  res.render('register_form', { title: 'ShopX | Register User' });
}).post(async (req, res, next) => {
  await check("name", "Name is required").notEmpty().run(req);
  await check("email", "Email is required").notEmpty().run(req);
  await check("email", "Email is invalid").isEmail().run(req);
  await check("password", "Password is required").notEmpty().run(req);
  await check("passwordConfirm", "Password Confirm is required").notEmpty().run(req);
  await check("password", "Passwords do not match").equals(req.body.passwordConfirm).run(req);
  var errors = validationResult(req);
  if (errors.isEmpty()) {

    // prevent duplicate emails
    User.find({email : req.body.email}, (error, users)=>{
      if (error) {
        res.send("error: finding user by email")
      } else {
        if (users.length != 0) {    
          // how do we handle errors?
          // by arrays?
          // console.log(errors);
          errors = [{value: '', msg: 'Email is duplicated', param : 'email', location:'body'}]
          res.render('register_form', { title: 'ShopX | Register User', errors: errors});
        } else {
          const newUser = new User({
            name : req.body.name,
            email : req.body.email
          });
          bcryptjs.genSalt(10, (error, salt) => {
            bcryptjs.hash(req.body.password, salt, (error, passwordHash) => {
              if (error) {
                console.log(JSON.stringify(error));
              }
              else {
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
      }
    })
  }
  else {
   
    res.render('register_form', { title: 'ShopX | Register User', errors: errors.array() });
  }
});

// GET Login form 
// POST Login form 
router.route('/login').get(isNotLoggedIn,function (req, res, next) {
  res.render('login_form');
}).post(async (req, res, next) => {
  await check("email", "Email is required").notEmpty().run(req);
  await check("email", "Email is invalid").isEmail().run(req);
  await check("password", "Password is required").notEmpty().run(req);
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


router.route('/logout').get(isLoggedIn,function (req, res, next) {
  req.logOut((error)=>{
    if (error){
      return next(error);
    }
    res.redirect("/users/login");
  })
})



module.exports = router;

