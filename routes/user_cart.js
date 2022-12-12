var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Product = require("../schemas/products");
const ShoppingCart = require("../schemas/shoppingCart");
const Order = require("../schemas/orders");
const User = require('../schemas/users');
const moment = require('moment-timezone');


const isLoggedIn = (req, res, next)=> {
    if (!req.isAuthenticated()) {
        res.redirect("/users/login");
    }
    else {
        next();
    }
  }
  

// SHOPPING CART ROUTES

router.get('/',isLoggedIn, (req,res,next)=>{
    ShoppingCart.find({order_by : req.user.id}, (error, orderitems)=> {
      if (error) {
        res.end("404 - error orderitems Line 142");
      } else {
        let subtotal = 0;
        orderitems.map(oi => {
          subtotal += oi.price_per_unit*oi.quantity;
        })
        let total = Math.round((subtotal * 1.13)*100)/100;
  
        res.render('order_summary', {orderitems:orderitems, subtotal : subtotal, total:total})
      }
    })
  })
  
  router.post('/',isLoggedIn, (req,res,next)=>{
  
    // address --> order , user
    ShoppingCart.find({order_by : req.user.id}, (error, orderitems)=> {
      if (error){
        res.end("404 - error cannot find order Line 154");
      } else {
        if (orderitems.length == 0) {
          res.end("no items");
        } else {
          // ** CALL BACK HELL
          User.findById(req.user.id, (error, user)=>{
            user.billing_address = {
              street : req.body.street,
              city : req.body.city,
              postCode : req.body.postcode
            }
            User.updateOne({_id : req.user.id}, user, (error)=>{
              if (error) {
                res.send("user error");
              } else {
  
                const order = new Order({
                  order_by : req.user.id,
                  order_items : orderitems,
                  order_date : moment().tz("America/Toronto").format('h:mma MMMM Do, YYYY'),
                  billing_address : {
                    street : req.body.street,
                    city : req.body.city,
                    postCode : req.body.postcode
                  }
                });
                order.save((error)=>{
                  if (error) {
                    res.end("ERROR - order has not saved Line 164");
                  } else {
                    ShoppingCart.deleteMany({order_by : req.user.id}, (error)=>{
                      if (error) {
                        res.end("ERROR - cannot delete order items Line 168")
                      } else {
                        res.redirect('/');
                        
                      }
                    })
                  }
                })
  
              }
            })
          })
        }
      }
    })
  })




module.exports = router;