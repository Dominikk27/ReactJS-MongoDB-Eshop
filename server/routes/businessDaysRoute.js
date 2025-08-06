const express = require("express");
const { updateBusinessDays, getBusinessDays } = require("../controller/businessDaysController.js");

const route = express.Router();

route.put("/updateBusinessDays", updateBusinessDays);
route.get("/getBusinessDays", getBusinessDays);


module.exports = route;