const express = require("express");
const {
  createProduct,
  getProductsByItem,
  deleteProduct,
} = require("./Product.service");

const productRouter = express.Router();

// Route to create a product
productRouter.post("/create", createProduct);

// Route to fetch products by itemId with expiration date and days until expiration
productRouter.get("/:itemId", getProductsByItem); // This route fetches products based on itemId

// Route to delete a product by ID
productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;
