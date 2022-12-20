# ShopX - Ecommerce Website
A  virtual ecommerce website built with Express, Node, Mongoose and MongoDB. View the live website [here!](https://ecommerce-site-nine-peach.vercel.app/)

## Overview 
<img src="https://i.postimg.cc/bNfZ1Qqd/Screen-Shot-2022-12-19-at-10-07-02-PM.png" alt="drawing" width="100%"/>

This website simulates a real ecommerce clothing store where you view products and checkout items. There is a login system for users to view their shopping cart and order history, as well as an admin login for managing products and users. Built in collaboration with [@zxck5](https://github.com/zxck5), [@melodyyip](https://github.com/melodyyip), [@Natasha-A](https://github.com/Natasha-A), and [@Alirezamaghsoud](https://github.com/Alirezamaghsoud). 

## Features 
This application displays virtual clothing items that contain virtual products and descriptions. 

Users can do the following:

- Create an account, login or logout
- Browse available products added by the admin
- Use Navbar to view products by categories, and use search bar to search products
- Add products to shopping cart
- Delete and edit products added to the shopping cart
- View product details and select options for colors and sizes available
- To check out, user must be logged in
- Accounts page includes user’s profile information and Order History view
- Order History includes all past purchased orders using date and item information in scroll view

Admins can do the following:

- Login and logout of the admin portal
- View all users registers, with ability to delete users if needed
- Admin can view/add/edit/delete products
- Admin can create, retrieve, update and delete users
- Admin can view a user’s order history

## Concepts Applied
- Database Storage for application data using MongoDB Atlas, applying data modelling techniques including linking and embedding
- Mongoose ORM Schemas for interacting with database and querying in Javascript
- CRUD functionalities built for products, orders, and users through controllers
- Routes and Controllers built with REST APIs using Node and Express for routes forwarding and request/response handling
- Asynchronous flow control for multiple requests, operations, queries and error handling
- Form validation and error handling for login/logout pages using Express Validator
- User creation and authentication using Passport.js and Bcrypt.js for password encryption
- Views designed in Figma and built using Pug Templates and fully custom CSS

## Sample Views  
<img src="https://i.postimg.cc/bJLm1ztw/prod-detials.png" alt="drawing" width="100%"/>
<img src="https://i.postimg.cc/y8z06MDQ/sign-up.png" alt="drawing" width="100%"/>
<img src="https://i.postimg.cc/sg904Fqq/order-history.png" alt="drawing" width="100%"/>
<img src="https://i.postimg.cc/0NyZGzpK/users.png" alt="drawing" width="100%"/>
