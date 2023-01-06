const Router = require("express").Router();
const Products = require("../models/products");
const Customers = require("../models/customer");
const Orders = require("../models/order");
const bodyParser = require("body-parser");

Router.use(bodyParser.json());

Router.post("/product", async (req, res) => {
    try {
        // console.log(req.body);
        const product = await Products.create(req.body);
        res.status(200).json({
            status: "product added successfully",
            product: product
        })

    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
})

Router.post("/customer", async (req, res) => {
    try {
        const customer = await Customers.create(req.body);
        res.status(200).json({
            status: "customer added successfully",
            customer: customer
        })
    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
})

Router.post("/orders", async (req, res) => {
    try {
        const newOrder = req.body;
        // console.log(newOrder);
        const checkCustomer = await Customers.find({customer_id:newOrder.customer_id});
        // console.log(checkCustomer[0]);
        if(checkCustomer.length===0){
            return res.status(400).json({
                status:"failed",
                message : "No customer with the given customer id"
            })
        }

        const checkProduct = await Products.find({Product_id:newOrder.Product_id});
        // console.log(checkProduct[0]);
        if(checkProduct.length===0){
            return res.status(400).json({
                status:"failed",
                message : "No product with the given product id"
            })
        }else if(checkProduct[0].Available_quantity===0 || checkProduct[0].Available_quantity<newOrder.quantity){
            return res.status(400).json({
                status:"failed",
                message : "out of stock"
            })
        }else if(checkCustomer[0].balance===0 || checkProduct[0].Product_price*newOrder.quantity>checkCustomer[0].balance){
            return res.status(400).json({
                status:"failed",
                message : "insufficient balance"
            })
        }else{
            const order = Orders.create(newOrder);
            checkProduct[0].Available_quantity = checkProduct[0].Available_quantity-newOrder.quantity; 
            const changeQuantity = await Products.updateOne({Product_id : newOrder.Product_id},checkProduct[0]);
            checkCustomer[0].balance = checkCustomer[0].balance - (checkProduct[0].Product_price*newOrder.quantity)
            const changeBalance = await Customers.updateOne({customer_id: newOrder.customer_id},checkCustomer[0])
            res.status(200).json({
                status: "Success",
                order : order
            })

        }
    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
})

module.exports = Router;
