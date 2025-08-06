const express = require('express');
const { updateSocials, getSocials } = require("../controller/socialsController.js");

const route = express.Router();

route.patch("/updateSocials", updateSocials);
route.get("/getSocials", getSocials);

module.exports = route;