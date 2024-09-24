
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./db.js');
dotenv.config();


const productRoutes = require('./routes/router.js');

const app = express();
app.use(express.json());
app.use(cors());


connectDB();


app.use('/', productRoutes)


const PORT = process.env.PORT || 30005;

app.listen(PORT,  () => {
    console.log("app is running");
})