const express = require("express");
const { createcarts, getallcart } = require("./Cart.service");

const cartrouter = express.Router();

cartrouter.post("/createcart", createcarts);
cartrouter.get("/", getallcart);

module.exports = cartrouter;
