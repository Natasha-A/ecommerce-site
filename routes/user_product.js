var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Product = require("../schemas/products");
const ShoppingCart = require("../schemas/shoppingCart");
const Order = require("../schemas/orders");
const User = require('../schemas/users');
const moment = require('moment-timezone');

const SUPER_USER_ID = "63976f7a0403b414ba4a4e4a";

const isUser = (req,res,next) => {
  if (!req.isAuthenticated() || req.user.id == SUPER_USER_ID) {
    res.redirect("/users/login");
  } else {
    next();
  }
}
  

// PRODUCT ROUTES 
// SEARCH
router.get('/search', async (req,res)=>{
    const {searchWord} = req.query;
    let products = [];
    // console.log(searchWord)
    if (searchWord) {
      products = await Product.find({
        name : new RegExp(`${searchWord}`, "i")
      })
    }
    res.render('index', { title: 'Clothing Shop | List of Clothing', products: products });
  
  })
  //TOP
  router.get('/category/top', (req,res)=>{
    Product.find({category : "Top"}, (error, products)=>{
      if (error) {
        res.send("Error in finding category products")
      } else {
        res.render('index', { title: 'Clothing Shop | List of Clothing', products: products });
      }
    })
  
  })
  //BOTTOM
  router.get('/category/bottom', (req,res)=>{
    Product.find({category : "Bottoms"}, (error, products)=>{
      if (error) {
        res.send("Error in finding category products")
      } else {
        res.render('index', { title: 'Clothing Shop | List of Clothing', products: products });
      }
    })
  })
  //SHOES
  router.get('/category/shoes', (req,res)=>{
    Product.find({category : "Shoes"}, (error, products)=>{
      if (error) {
        res.send("Error in finding category products")
      } else {
        res.render('index', { title: 'Clothing Shop | List of Clothing', products: products });
      }
    })
  })

  // GET request for one Product 
  router.get('/:id', function(req,res) {
    var id = req.params.id;
    Product.findById(id, (error, product) => {
      if (error) {
        res.end("404 - No this product line 60");
      }
      else {
        
        res.render('product_detail', { title:'Product Details', product: product, url : "/product/" + product._id });
      }
    });
  });

  // POST request for Product (Add to ShoppingCart)
router.post('/:id',isUser, (req,res) => {
  
      Product.findById(req.params.id, (errors,product) => {
        const orderItem = new ShoppingCart({
          product_id: req.params.id, 
          product_name: product.name, 
          size: req.body.size,
          color: req.body.color,
          quantity: req.body.quantity, 
          order_by: req.user.id, 
          order_confirm:false,
          product_img: product.image[0], 
          price_per_unit:product.price
        })
        ShoppingCart.find({product_id : req.params.id, order_by : req.user.id, color : orderItem.color, size : orderItem.size}, (error, oi)=>{
          if (error) {
            res.send("error");
          } else {
            if (oi.length == 0) {
              orderItem.save((error)=>{
                res.redirect('/');
              })
            } else {
              oi[0].quantity += orderItem.quantity;
              ShoppingCart.updateOne({_id : oi[0]._id}, oi[0], (error)=>{
                res.redirect('/');
              } )
            }
          }
        })
      })  

});
  

module.exports = router;