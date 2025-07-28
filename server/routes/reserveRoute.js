const express = require('express');

const { reserveProduct } = require("../controller/reservationController.js");

const route = express.Router();

route.post("/reserveProduct", reserveProduct);

module.exports = route;