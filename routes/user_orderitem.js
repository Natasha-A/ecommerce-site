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
  

// USER ORDERITEM DELETE
router.get('/delete/:id',isLoggedIn, (req,res)=>{
    let id = req.params.id;
    ShoppingCart.deleteOne({_id : id}, (error)=>{
      if (error) {
        res.send("ERROR in deleting order item")
      } else {
        res.redirect('/cart');
      }
    })
    
  })
  // USER ORDERITEM EDIT
  // Quantity
  router.get('/edit/:id',isLoggedIn,(req,res)=>{
    let id = req.params.id;
    ShoppingCart.findById(id, (error,orderitem) => {
      if (error) {
        res.send("ERROR in EDITING orderitem for user");
      } else {
        Product.findById(orderitem.product_id, (error, product)=>{
          
          if (error) {
            res.send("ERROR in EDITING orderitem for user");
          } else {
            res.render('product_detail', { title:'Product Details', product: product, url : "/orderitem/edit/" +  orderitem._id});
          }
        })
      }
    })
  })
  router.post('/edit/:id',isLoggedIn, async (req,res)=> {
    // update info
    const orderItem = await ShoppingCart.findById(req.params.id);
    orderItem.size = req.body.size;
    orderItem.color = req.body.color;
    orderItem.quantity = req.body.quantity;
  
    if (orderItem.order_by != req.user.id) {
      res.redirect('/users/login');
    } else {
      // console.log("pass1  ")
      // check duplicates
      const searchedOrderItems = await ShoppingCart.find({product_id : orderItem.product_id, order_by : req.user.id, color : orderItem.color, size : orderItem.size});
      
      // console.log("pass2  " + searchedOrderItems)
      // if it is unique
      if (searchedOrderItems.length == 0) {
        console.log("pass3  " + searchedOrderItems.length)
        ShoppingCart.updateOne({_id: req.params.id}, orderItem, (error)=>{
          res.redirect('/cart');
        })
      // if there are two, merge them
      }else if (searchedOrderItems.length == 1){
  
        // console.log("pass4  " + searchedOrderItems.length)
  
        orderItem.quantity += searchedOrderItems[0].quantity;
        ShoppingCart.deleteOne({_id : searchedOrderItems[0]._id}, (error)=>{
          if (error) {
            res.send("there was error during deleting")
          } else {
            ShoppingCart.updateOne({_id: req.params.id}, orderItem, (error)=>{
              res.redirect('/cart');
            })
          }
        });
      }
    }
  })



module.exports = router;