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
    if (!req.isAuthenticated() || req.user.id != SUPER_USER_ID) {
        res.redirect("/users/login");
    }
    else {
        next();
    }
  }



router.get('/users',isSuperUser, (req,res)=>{

    User.find((error, users)=>{
        if (error) {
            res.send("error finding users")
        } else {
            res.render('admin_users_view', {title : "Customer Accounts", users : users})
        }
    })
})

router.get('/user/delete/:id',isSuperUser, (req,res)=>{
    // delete user,
    // delete order
    Order.deleteMany({order_by : req.params.id}, error => {
        if (error) {
            res.send("order delete error")
        } else {
            User.deleteOne({_id : req.params.id}, error => {
                if (error) {
                    res.send("user delete error");
                } else {
                    res.redirect('/admin/users');
                }
            })
        }
    })


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
                  
                res.render('order_history', {title : "Order History", orders : orders, user : users[0]})
              }
            })
        }
      })  
})






module.exports=router;