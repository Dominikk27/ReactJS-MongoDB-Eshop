
const express = require('express');
const path = require('path');

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
app.use('/images', express.static(path.join(__dirname, 'images')));

const PORT = process.env.PORT || 30005;

app.listen(PORT,  () => {
    console.log("app is running on PORT: ", {PORT});
})