var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Product = require("../schemas/products");
const ShoppingCart = require("../schemas/shoppingCart");

const TEST_USER_ID = "6389535a05d2a7b8d29eb5f9"


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
      res.render('product_detail', { title:'Product Details', product: product });
    }
  });
});

// POST request for Product (Add to ShoppingCart)
router.post('/product/:id', function(req,res) {
    Product.findById(req.params.id, (errors,product) => {
      
      const orderItem = new ShoppingCart({
        product_id: req.params.id, 
        product_name: product.name, 
        size: req.body.size,
        color: req.body.color,
        quantity: req.body.quantity, 
        order_by:TEST_USER_ID, 
        order_confirm:false,
        product_image: product.image[0], 
        price_per_unit:product.price
      })
      console.log("ORDER ITEM: " + orderItem)    

      orderItem.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/cart")
      });
      
    })
});

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
      let order = {}
      let Jiwon = "UPDATE";
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
