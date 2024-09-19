require("dotenv").config();

const mongoose = require('mongoose');

const uri = process.env.uri;

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(uri, {});

        console.log('MongoDB connected!');

    }catch (error){
        console.error('Could not connect to DB: ', error);
    }
};

module.exports = connectDB;