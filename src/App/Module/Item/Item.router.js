const express = require("express");
const { createItems, getallitems, deleteItem } = require("./Item.service");

const itmesrouter = express.Router();

itmesrouter.post("/createitem", createItems);
itmesrouter.get("/", getallitems);
itmesrouter.delete("/:id", deleteItem);

module.exports = itmesrouter;
