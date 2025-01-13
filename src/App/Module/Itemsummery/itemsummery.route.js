const express = require("express");
const { getItemSummary } = require("./itemsummery.service");

const summeryrouter = express.Router();

summeryrouter.get("/", getItemSummary);

module.exports = summeryrouter;
