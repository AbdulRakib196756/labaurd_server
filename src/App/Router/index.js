const express = require("express");

const cowsrouter = require("../Module/Menu/Menu.router");
const reviewrouter = require("../Module/Review/Review.router");
const cartrouter = require("../Module/Cart/Cart.router");

const routes = express.Router();

const Routermodeuls = [
  {
    path: "/menu",
    route: cowsrouter,
  },
  {
    path: "/review",
    route: reviewrouter,
  },
  {
    path: "/cart",
    route: cartrouter,
  },
];

Routermodeuls.forEach((module) => routes.use(module.path, module.route));

module.exports = routes;
