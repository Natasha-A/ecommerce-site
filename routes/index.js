var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Product = require("../schemas/products");
const ShoppingCart = require("../schemas/shoppingCart");

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
// PRODUCT ROUTES 

// GET request for creating a product 
router.get("/create", function(req, res, next) {
  res.render('product_form', {title: 'Not implemented: GET Create Product'})
})

// POST request for creating product 
router.post("/create", function(req, res, next) {
  res.render('product_form', {title:'Not implemented: POST Create Product'})
})

// GET request to delete product 
router.get("/:id/delete", function(req, res, next) {
  res.render('product_delete', {title:'Not implemented: GET Delete Product'})
})

// POST request to delete product 
router.post('/:id/delete', function(req, res, next) {
  res.render('product_delete', {title:'Not implemented: POST Delete Product'})
})

// GET request to update product 
router.get('/:id/update', function(req,res,next) {
  res.render('product_form', {title: 'Not implemented: GET Update Product'})
})

// POST request to update product
router.post('/:id/update', function(req, res, next) {
  res.render('product_form', {title: 'Not implemented: POST Update Product'})
})

// GET request for one Product 
router.get('/product/:id', function(req,res) {
  var id = req.params.id;
  Product.findById(id, (error, product) => {
    if (error) {
      res.end("404 - No this product");
    }
    else {
      console.log(product)
      res.render('product_detail', { title: 'product_detail', product: product });
    }
  });
});
// PRODUCT DETAIL ROUTES

router.post('/product/:id', (req,res)=>{
  let id = req.params.id;
  // shopping cart save.
  // findby {order by} --> find shopping cart, 
  // check if product id is duplicate,
  // if duplicate --> quantity ++  else --> save()
})



// SHOPPING CART ROUTES

router.get('/cart', (req,res,next)=>{
  const query = {order_by : "6389535a05d2a7b8d29eb5f9"}
  const cursor = ShoppingCart.find(query, (error, orderitems)=> {
    if (error) {
      res.end("404 - error orderitems");
    } else {


      res.render('shopping_cart', {title: "Shopping Cart", orderitems:orderitems})
    }
  })
})
router.post('/cart', (req,res,next)=>{
  const query = {order_by : "6389535a05d2a7b8d29eb5f9"}
  const cursor = ShoppingCart.find(query, (error, orderitems)=> {
    if (error){
      res.end("404 - error order");
    } else {
      let cart = {}
      
    }
  })
})

// ORDER ROUTES

// GET request for Order details
router.get('/order/:id', function(req, res, next) {
  res.render('order_form', {title: 'Not implemented: GET Order Form'})
})


// POST request for Order details
router.post('/order/:id', function(req, res, next) {
  res.render('order_form', {title: 'Not implemented: POST Order Form'})
})


module.exports = router;
