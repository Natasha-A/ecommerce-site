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
      var totalCost = 0;
      if (error) {
        res.send("User not found");
      } else {
        Order.find({order_by : req.user.id}, (error, pastOrders)=> {
          if (error) {
            res.send("ERROR : order not found")
          }
          pastOrders.forEach(function(order) {
            let orderItems = order.order_items
            let orderCost = 0;
            orderItems.forEach(orderItem => {
              orderCost += orderItem.price_per_unit * orderItem.quantity
              totalCost += orderCost
            })
          })
            res.render('order_history', {title : "Order History", orders : pastOrders, user : user, total : totalCost})
          })
        }
    })  

})



module.exports = router;