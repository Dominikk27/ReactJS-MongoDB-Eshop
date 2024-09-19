
const express = require('express');
const cors = require('cors');


const connectDB = require('./db.js');
const productModel = require('./models/products.js')


const app = express();
app.use(express.json());

connectDB();


app.use(cors());

app.get('/', async (req, res) => {
    const response = await productModel.find();
    return res.json({products : response});
})


app.listen(3005,  () => {
    console.log("app is running");
})