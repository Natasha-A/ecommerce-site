var express = require("express");
const { check, validationResult, body } = require("express-validator");
var router = express.Router();
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const User = require("../schemas/users");
const passport = require("passport");
const Order = require("../schemas/orders");
const Product = require("../schemas/products");

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
};

// GET request for creating a product
router.get("/create", isSuperUser, function (req, res, next) {
  res.render("product_form", { title: "Create Product" });
});

// POST request for creating product
router.post("/create", [
  // Validate and santize fields
  body("name", "Name must not be empty.").trim().isLength({ min: 1 }).escape(),
  body("colors", "Colours must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("image", "Image must not be empty and valid image type.")
    .trim()
    .isLength({ min: 1 })
    .matches(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i),
  body("sizes.*").escape(),

  (req, res, next) => {
    let sizeOptions = [];
    let colors = [];
    colors = req.body.colors.split(",");

    if (!Array.isArray(req.body.size)) {
      sizeOptions = ["Small", "Medium", "Large"];
    } else {
      if (req.body.xSmall == "on") sizeOptions.push("X-Small");
      if (req.body.Small == "on") sizeOptions.push("Small");
      if (req.body.Medium == "on") sizeOptions.push("Medium");
      if (req.body.Large == "on") sizeOptions.push("Large");
      if (req.body.xLarge == "on") sizeOptions.push("X-Large");
    }
    // Extract validation errors from request
    const errors = validationResult(req);
    // Create Product object with escaped and trimmed data
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      color: colors,
      size: sizeOptions,
      category: req.body.category,
      image: req.body.image,
      posted_by: SUPER_USER_ID,
    });
    console.log(req.body.image)

    if (!errors.isEmpty()) {
      res.render("product_form", {
        title: "Create Product",
        errors: errors.array(),
      });
      console.log(errors);
    } else {
      // Data from form is valid. Save Product
      product.save((err) => {
        if (err) {return next(err);}
        res.redirect("/product/" + product.id);
      });
    }
  },
]);

// GET request to delete product
router.get("/:id/delete", isSuperUser, function (req, res, next) {
  res.render("product_delete", {
    title: "Not implemented: GET Delete Product",
  });
});

// POST request to delete product
router.post("/:id/delete", isSuperUser, function (req, res, next) {
  res.render("product_delete", {
    title: "Not implemented: POST Delete Product",
  });
});

// GET request to update product
router.get("/:id/update", isSuperUser, function (req, res, next) {
  res.render("product_form", { title: "Not implemented: GET Update Product" });
});

// POST request to update product
router.post("/:id/update", isSuperUser, function (req, res, next) {
  res.render("product_form", { title: "Not implemented: POST Update Product" });
});

module.exports = router;
