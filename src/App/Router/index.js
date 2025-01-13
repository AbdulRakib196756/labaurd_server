const express = require("express");

const userrouter = require("../Module/Users/Users.route");
const itmesrouter = require("../Module/Item/Item.router");
const Productrouter = require("../Module/Product/Product.route");
const summeryrouter = require("../Module/Itemsummery/itemsummery.route");

const routes = express.Router();

const Routermodeuls = [
  {
    path: "/user",
    route: userrouter,
  },
  {
    path: "/items",
    route: itmesrouter,
  },
  {
    path: "/product",
    route: Productrouter,
  },
  {
    path: "/summery",
    route: summeryrouter,
  },
];

Routermodeuls.forEach((module) => routes.use(module.path, module.route));

module.exports = routes;
