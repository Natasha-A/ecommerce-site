var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Product = require("../schemas/products");
const ShoppingCart = require("../schemas/shoppingCart");
const Order = require("../schemas/orders");
const User = require('../schemas/users');
const moment = require('moment-timezone');





// GET site home page.
router.get('/', function (req, res, next) {
  Product.find({}, (error,productsArray) => {
    if (error) {
      console.log("Something bad happened");

    }
    else {
      res.render('index', { title: 'Clothing Shop | List of Clothing', products: productsArray });
    }
  })
});




module.exports = router;
