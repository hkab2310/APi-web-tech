const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
   customer_id : {type:String},
   Product_id : {type:String},
   Product_name : {type:String},
   quantity : {type :Number}
})

const Order = mongoose.model("Order",orderSchema);

module.exports = Order;