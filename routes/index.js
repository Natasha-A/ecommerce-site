var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Product = require("../schemas/products");
const ShoppingCart = require("../schemas/shoppingCart");
const Order = require("../schemas/orders");



const isLoggedIn = (req, res, next)=> {
  if (!req.isAuthenticated()) {
      res.redirect("/users/login");
  }
  else {
      next();
  }
}


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
      res.end("404 - No this product line 60");
    }
    else {
      
      res.render('product_detail', { title:'Product Details', product: product, url : "/product/" + product._id });
    }
  });
});


// POST request for Product (Add to ShoppingCart)
router.post('/product/:id',isLoggedIn, (req,res) => {
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
// USER ORDERITEM DELETE
router.get('/orderitem/delete/:id',isLoggedIn, (req,res)=>{
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
router.get('/orderitem/edit/:id',isLoggedIn,(req,res)=>{
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
router.post('/orderitem/edit/:id',isLoggedIn,(req,res)=> {

  ShoppingCart.findById(req.params.id, (error, orderItem)=>{
    if (error) {
      res.send("orderitem not found -- editing");
    } else {
      orderItem.size = req.body.size;
      orderItem.color = req.body.color;
      orderItem.quantity = req.body.quantity;
      if (orderItem.order_by != req.user.id) {
        res.redirect('/users/login');
      }
      ShoppingCart.updateOne({_id: req.params.id}, orderItem, (error)=>{
        res.redirect('/cart');
      })
    }
  })
})


// SHOPPING CART ROUTES

router.get('/cart',isLoggedIn, (req,res,next)=>{
  ShoppingCart.find({order_by : req.user.id}, (error, orderitems)=> {
    if (error) {
      res.end("404 - error orderitems Line 142");
    } else {

      res.render('shopping_cart', {title: "Shopping Cart", orderitems:orderitems})
    }
  })
})

router.post('/cart',isLoggedIn, (req,res,next)=>{

  // address --> order , user
  ShoppingCart.find({order_by : req.user.id}, (error, orderitems)=> {
    if (error){
      res.end("404 - error cannot find order Line 154");
    } else {
      if (orderitems.length == 0) {
        res.end("no items");
      } else {
        console.log(orderitems);
        const order = new Order({
          order_by : req.user.id,
          order_items : orderitems,
          order_date : new Date()
        });
        order.save((error)=>{
          if (error) {
            res.end("ERROR - order has not saved Line 164");
          } else {
            ShoppingCart.deleteMany({order_by : req.user.id}, (error)=>{
              if (error) {
                res.end("ERROR - cannot delete order items Line 168")
              } else {
                res.redirect('/order');
                
              }
            })
          }
        })
      }
    }
  })
})

// ORDER History
router.get('/order', isLoggedIn, (req,res)=> {
  Order.find({order_by : req.user.id}, (error, orders)=> {
    if (error) {
      res.send("ERROR : order not found")
    } else {
      res.render('order_history', {title : "order history", orders : orders})
    }
  })
})



// GET request for Order details
router.get('/order/:id', function(req, res, next) {
  res.render('order_form', {title: 'Not implemented: GET Order Form'})
})


// POST request for Order details
router.post('/order/:id', function(req, res, next) {
  res.render('order_form', {title: 'Not implemented: POST Order Form'})
})


module.exports = router;
