
const productRoute = require("./routes/productRoute.js");
const visualsRoute = require("./routes/visualsRoute.js");

const env = require("dotenv");
const express = require("express");
const { mongoose } = require("mongoose");
const cors = require("cors");

const path = require("path");


const app = express();
env.config()

const MONGO_URI = process.env.MONGO_URI;
const DOMAIN_URI = process.env.DOMAIN_URI;

mongoose.connect(MONGO_URI)
    .then(() =>{
        console.log("✅ Successfully connected to DB!");
        app.listen(process.env.PORT, () =>
        {
            console.log('🚀 Server Running on port ', process.env.PORT);   
            console.log(mongoose.connection.name);
        })
    })
    .catch((e) =>{
        console.log("❌ ", e, " Error with connection to DB");
    })


app.use(cors());

app.use("/images", express.static(path.join(__dirname,'images')));

app.use("/adminpanel/visuals", visualsRoute)

app.use("/products/api", productRoute);