const Router = require("express").Router();
const Products = require("../models/products");
const Customers = require("../models/customer");
const Orders = require("../models/order");
const bodyParser = require("body-parser");

Router.get('/product/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        // console.log(productId);
        const product = await Products.find({ Product_id: productId })
        if (product.length === 0) {
            const products = await Products.find({ Product_type: productId })
            if (products.length === 0) {
                return res.status(400).json({
                    status: "Failed",
                    message: "ProductId or ProductType not present"
                })
            }
            return res.status(200).json({
                status: "products fetched successfully",
                products: products
            })

        }
        res.status(200).json({
            status: "product fetched successfully",
            product: product
        })
    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
})

Router.get('/customer/:customerId', async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const customer = await Customers.find({ customer_id: customerId })
        res.status(200).json({
            status: "customer fetched successfully",
            customer: customer
        })
    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
})

Router.get('/orders/:orderId', async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await Orders.find({ _id: orderId })
        res.status(200).json({
            status: "order fetched successfully",
            order : order
        })
    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
})





module.exports = Router