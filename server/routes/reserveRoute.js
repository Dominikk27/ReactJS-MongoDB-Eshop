const express = require('express');

const { reserveProduct, getReservations, updateReservation } = require("../controller/reservationController.js");

const route = express.Router();

route.post("/reserveProduct", reserveProduct);

route.get("/getReservations", getReservations);
route.put("/updateReservation/:id", updateReservation);


module.exports = route;