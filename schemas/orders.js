//Still not confirm yet
const mongoose = require("mongoose");
let orderSchema = mongoose.Schema({
order_by:{
    type: String,
    required : true,
},
order_items:{
    type: [{}],
    required : true,
},
order_date:{
    type: Date,
    required : true,
},
billing_address:{
    type: [{}],
    required : false
}
});

module.exports = mongoose.model("Orders", orderSchema);