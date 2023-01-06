const express = require('express');
const mongoose = require('mongoose');

const postRoutes = require("./routes/postData")
const getRoutes = require("./routes/getData")

const app = express();

mongoose.connect("mongodb://localhost/api_web_tech_assignment").then(()=>{
    console.log("connected to mongoDB");
})

app.use("/",postRoutes);
app.use("/",getRoutes);

app.listen(3000,()=>{
    console.log("Server running at port 3000");
})