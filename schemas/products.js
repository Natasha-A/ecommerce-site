const mongoose = require("mongoose");
let prodSchema = mongoose.Schema({
name:{
    type: String,
    required : true,
},
price:{
    type: Number,
    required : true,
},
color:{
    type: [String],
    required : true,
},
size:{
    type: [String],
    required : true,
},
category:{
    type:String,
    required : true,
},
image:{
    type: [String],
    required : false,
},
posted_by:{
    type: String,
    required : true,
}
});

module.exports = mongoose.model("Product", prodSchema);