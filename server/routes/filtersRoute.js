const express = require('express');
const { getFilters } = require("../controller/filtersController.js");


const route = express.Router();

route.get("/getFilters", getFilters);

module.exports = route;