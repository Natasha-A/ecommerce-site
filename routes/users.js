var express = require('express');
var router = express.Router();

// GET Register form  
router.get('/register', function(req, res, next){
  res.render('register_form', {title: 'Not implemented: GET Register Form'})
})

// POST Register form 
router.post('/register', function(req, res, next){
  res.render('register_form', {title: 'Not implemented: POST Register Form'})
})

// GET Login form 
router.get('/login', function(req, res, next) {
  res.render('login_form', {title: 'Not implemented: GET Login Form'})
})

// POST Login form 
router.post('/login', function(req, res, next) {
  res.render('login_form', {title: 'Not implemented: POST Login Form'})
})

// GET Logout
router.get('/logout', function(req, res) {
  res.redirect('/login')
})

module.exports = router;
