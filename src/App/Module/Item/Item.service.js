const Item = require("./Item.model");

const createItems = async (req, res) => {
  try {
    const itemdata = req.body;
    const item = await Item.create(itemdata);
    res.status(200).json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json("item create error");
  }
};
const getallitems = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query; // Destructure query parameters with defaults

    // Convert page and limit to numbers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Build the search query
    const query = search
      ? { Name: { $regex: search, $options: "i" } } // Case-insensitive search
      : {};

    // Get total count for pagination
    const totalItems = await Item.countDocuments(query);

    // Find items with pagination and search
    const items = await Item.find(query)
      .skip((pageNumber - 1) * limitNumber) // Skip items for previous pages
      .limit(limitNumber) // Limit the number of items returned
      .lean();

    res.status(200).json({
      items,
      totalItems,
      totalPages: Math.ceil(totalItems / limitNumber),
      currentPage: pageNumber,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("get items error");
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Item.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting Item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createItems,
  getallitems,
  deleteItem,
};
