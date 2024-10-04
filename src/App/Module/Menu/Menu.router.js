const express = require("express");
const { getallmenu, createmenu } = require("./Menu.service");

const cowsrouter = express.Router();

cowsrouter.get("/", getallmenu);
cowsrouter.post("/", createmenu);

module.exports = cowsrouter;
