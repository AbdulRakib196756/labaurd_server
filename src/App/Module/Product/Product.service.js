const Product = require("./Product.model");

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, expirationDate, itemId, location } = req.body;

    // Validation already handled in the model, but optional here
    if (!name || !expirationDate || !itemId || !location) {
      return res.status(400).json({
        error:
          "All fields are required (name, expirationDate, itemId, location)",
      });
    }

    const product = await Product.create({
      name,
      expirationDate,
      itemId,
      location,
    });
    res.status(201).json(product); // 201 for successful creation
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    console.error("Product creation error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get products by itemId
const getProductsByItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const products = await Product.find({ itemId })
      .select("name expirationDate location") // Select necessary fields
      .populate("itemId", "name"); // Optionally populate the Item details

    if (products.length === 0) {
      return res.status(404).json({ error: "No products found for this item" });
    }

    const now = new Date();
    const productsWithExpiration = products.map((product) => {
      const expirationDate = new Date(product.expirationDate);
      const daysUntilExpiration = Math.ceil(
        (expirationDate - now) / (1000 * 60 * 60 * 24)
      );

      return {
        id: product._id.toString(), // Ensure unique ID for each item
        name: product.name,
        location: product.location,
        expirationDate: expirationDate.toISOString().split("T")[0], // Format date as YYYY-MM-DD
        daysUntilExpiration: daysUntilExpiration, // Dynamically calculated value
      };
    });

    res.status(200).json(productsWithExpiration);
  } catch (error) {
    console.error("Error fetching products by item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createProduct,
  getProductsByItem,
  deleteProduct,
};
