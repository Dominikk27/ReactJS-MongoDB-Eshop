const express = require("express");
const { authRegister, authLogin } = require("../controller/authController.js");


const route = express.Router();

route.post("/register", authRegister);
route.post("/login", authLogin);


module.exports = route;
