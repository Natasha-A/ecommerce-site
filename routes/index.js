var express = require('express');
var router = express.Router();

// GET site home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Clothing Shop' });
});

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
router.get('/product/:id', function(req, res, next) {
  res.render('product_detail', {title: 'Not implemented: GET Product Detail'})
})





module.exports = router;
