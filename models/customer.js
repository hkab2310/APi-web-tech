const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
   customer_id : {type : String, required : true, unique : true},
   customer_name : {type : String},
   email : {type: String,unique:true},
   balance : {type: Number}
})

const Customer = mongoose.model("Customer",customerSchema);

module.exports = Customer;