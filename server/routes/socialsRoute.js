const express = require('express');
const { updateSocials, getSocials } = require("../controller/socialsController.js");

const route = express.Router();

route.put("/updateSocials", updateSocials);
route.get("/getSocials", getSocials);

module.exports = route;