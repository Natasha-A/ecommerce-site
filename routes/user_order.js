var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Product = require("../schemas/products");
const ShoppingCart = require("../schemas/shoppingCart");
const Order = require("../schemas/orders");
const User = require('../schemas/users');
const moment = require('moment-timezone');

const SUPER_USER_ID = "63976f7a0403b414ba4a4e4a";


const isLoggedIn = (req, res, next)=> {
  if (!req.isAuthenticated()) {
      res.redirect("/users/login");
  }
  else {
      next();
  }
}
 
// ORDER History
router.get('/', isLoggedIn,(req,res)=> {
    
    User.findById(req.user.id, (error, user)=>{

      if (error) {
        res.send("User not found");
      } else {
        Order.find({order_by : req.user.id}, (error, orders)=> {
          let total = 0;
          if (error) {
            res.send("ERROR : order not found")
          } else {
            if (orders.order_items !== undefined) {
              orders.order_items.map(oi=>{
                  subtotal += oi.quantity * oi.price_per_unit;
              })
              total = Math.round((subtotal * 1.13)*100)/100;
          }

            res.render('order_history', {title : "Order History", orders : orders, user : user, total : total})
          }
        })
      }
    })  

})





module.exports = router;