const mongoose = require("mongoose");
let userSchema = mongoose.Schema({
name:{
    type: String,
    required : true,
},
email:{
    type: String,
    required : true,
},
password:{
    type: String,
    required : true,
},
billing_address:{
    type: {},
    required : false
}
});

module.exports = mongoose.model("Users", userSchema);