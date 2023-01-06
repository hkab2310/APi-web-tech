const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    Product_id : {type: String,required:true,unique:true},
    Product_type : {type : String},
    Produt_name : {type : String},
    Product_price :{type :Number},
    Available_quantity : {type:Number}
})

const Product = mongoose.model("Product",productSchema);

module.exports = Product;