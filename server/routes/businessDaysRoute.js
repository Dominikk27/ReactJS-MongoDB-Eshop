const express = require("express");
const { updateBusinessDays } = require("../controller/businessDaysController.js");

const route = express.Router();

route.put("/updateBusinessDays", updateBusinessDays);


module.exports = route;