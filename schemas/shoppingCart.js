const mongoose = require("mongoose");
let shoppingCartSchema = mongoose.Schema({
product_id:{
    type: Number,
    required : true,
},
product_name:{
    type: String,
    required : true,
},
size:{
    type: String,
    required : true,
},
color:{
    type: String,
    required : true,
},
quantity:{
    type:Number,
    required : true,
},
order_by:{
    type: String,
    required : false,
},
order_confirm:{
    type: boolean,
    required : true,
},
product_img:{
    type: [String],
    required : true,
},
price_per_unit:{
    type: Number,
    required : true,
}
});

module.exports = mongoose.model("ShoppingCart", shoppingCartSchema);