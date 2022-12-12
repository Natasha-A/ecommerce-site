var express = require('express');
const { check, validationResult } = require('express-validator');
var router = express.Router();
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const User = require("../schemas/users");
const passport = require("passport");
const Order = require("../schemas/orders");
const Product = require("../schemas/products")

const SUPER_USER_ID = "63976f7a0403b414ba4a4e4a";

const isSuperUser = (req, res, next)=> {
    if (!req.isAuthenticated()) {
        res.redirect("/users/login");
    }
    else {
        if (req.user.id == SUPER_USER_ID) {
            next();
        } else {
            res.redirect('/users/login')
        }
    }
  }

  // GET request for creating a product 
router.get("/create", isSuperUser, function(req, res, next) {
    res.render('product_form', {title: 'Create Product'})
  })
  
  // POST request for creating product 
  router.post("/create",isSuperUser, function(req, res, next) {
    res.render('product_form', {title:'Not implemented: POST Create Product'})
  })
  
  // GET request to delete product 
  router.get("/:id/delete",isSuperUser, function(req, res, next) {
    res.render('product_delete', {title:'Not implemented: GET Delete Product'})
  })
  
  // POST request to delete product 
  router.post('/:id/delete', isSuperUser,function(req, res, next) {
    res.render('product_delete', {title:'Not implemented: POST Delete Product'})
  })
  
  // GET request to update product 
  router.get('/:id/update', isSuperUser,function(req,res,next) {
    res.render('product_form', {title: 'Not implemented: GET Update Product'})
  })
  
  // POST request to update product
  router.post('/:id/update', isSuperUser,function(req, res, next) {
    res.render('product_form', {title: 'Not implemented: POST Update Product'})
  })


  module.exports = router;