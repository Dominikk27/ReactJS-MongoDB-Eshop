const express = require("express");
const { authRegister, authLogin, authLogout, authRefresh } = require("../controller/authController.js");


const route = express.Router();

route.post("/register", authRegister);
route.post("/login", authLogin);
route.post("/logout", authLogout);

route.get("/status", authRefresh);


module.exports = route;
