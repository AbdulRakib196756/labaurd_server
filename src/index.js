const express = require("express");

const app = express();
const cors = require("cors");
const routes = require("./App/Router");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const port = process.env.PORT || 5000;

// midleware

app.use(cors());
app.use(express.json());

// Route
// app.get("/", (req, res) => {
//   res.send("Bistro Boss is running");
// });

app.use("/api/v1", routes);

module.exports = app;
