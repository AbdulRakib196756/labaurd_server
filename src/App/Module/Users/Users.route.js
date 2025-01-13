const express = require("express");
const {
  createuser,
  getalluser,
  deleteuser,
  updateuserrole,
} = require("./Users.service");

const userrouter = express.Router();

userrouter.post("/createuser", createuser);
userrouter.delete("/:id", deleteuser);
userrouter.patch("/update/:id", updateuserrole);
userrouter.get("/", getalluser);

module.exports = userrouter;
