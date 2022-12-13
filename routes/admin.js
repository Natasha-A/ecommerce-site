var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Product = require("../schemas/products");
const ShoppingCart = require("../schemas/shoppingCart");
const Order = require("../schemas/orders");
const User = require('../schemas/users');
const moment = require('moment-timezone');

const SUPER_USER_ID = "63976f7a0403b414ba4a4e4a";

const isSuperUser = (req, res, next)=> {
    if (!req.isAuthenticated()) {
        res.redirect("/users/login");
    }
    else {
        if (req.user.id == SUPER_USER_ID) {
            // super user
            next();
        } else {
            // alert messages
            res.redirect('/users/login')
        }
    }
  }



router.get('/users',isSuperUser, (req,res)=>{

    User.find((error, users)=>{
        if (error) {
            res.send("error finding users")
        } else {
            res.render('admin_users_view', {title : "USERS", users : users})
        }
    })
})

router.get('/user/delete/:id',isSuperUser, (req,res)=>{
    // delete user,
    // delete order


})

router.get('/orders/:email', isSuperUser, (req,res)=>{

    User.find({email : req.params.email}, (error, users)=>{
        if (error) {
          res.send("User not found");
        } else {
            Order.find({order_by : users[0]._id}, (error, orders)=> {
              if (error) {
                res.send("ERROR : order not found")
              } else {
                  console.log(orders)
                  
                res.render('order_history', {title : "order history", orders : orders, user : users[0]})
              }
            })
        }
      })  
})






module.exports=router;