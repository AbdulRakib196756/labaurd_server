const express = require("express");
const { getallreview, creatreview } = require("./Review.service");

const reviewrouter = express.Router();

reviewrouter.get("/", getallreview);
reviewrouter.post("/", creatreview);

module.exports = reviewrouter;
