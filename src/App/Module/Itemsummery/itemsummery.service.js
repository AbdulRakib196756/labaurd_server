const Item = require("../Item/Item.model");
const Product = require("../Product/Product.model");

const getItemSummary = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, name } = req.query; // Extract query parameters

    // Convert page and limit to numbers
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);

    // Build the base filter object for searching by name
    const filter = {};
    if (name) filter.Name = new RegExp(name, "i"); // Case-insensitive search for the "Name" field

    // Fetch all items from the database (no filters applied)
    const allItems = await Item.find().lean();

    let totalItems = allItems.length;
    let totalStockout = 0;
    let totalExpired = 0;

    const filteredItems = [];
    for (const item of allItems) {
      const products = await Product.find({ itemId: item._id });

      const totalStock = products.length;
      let itemStatus = "None";
      let expiredSoon = false;

      if (totalStock === 0) {
        itemStatus = "Stockout";
        totalStockout += 1; // Increment stockout counter
      } else {
        const now = new Date();

        for (const product of products) {
          if (product.expirationDate <= now) {
            itemStatus = "Expired";
            totalExpired += 1; // Increment expired counter
            break;
          } else if (
            product.expirationDate <=
            new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
          ) {
            expiredSoon = true;
          }
        }
      }

      // Apply the name and status filter dynamically
      const matchesFilter =
        (!status || itemStatus === status) &&
        (!name || new RegExp(name, "i").test(item.Name));

      if (matchesFilter) {
        filteredItems.push({
          itemId: item._id.toString(),
          name: item.Name,
          unit: item.Unit,
          category: item.Category,
          Hazard: item.Hazard,
          Instruction: item.Instruction,
          Incompatibility: item.Incompatibility,
          totalStock,
          status: itemStatus,
          expiredSoon,
        });
      }
    }

    // Paginate the filtered results
    const paginatedItems = filteredItems.slice(
      (pageNum - 1) * limitNum,
      pageNum * limitNum
    );

    res.status(200).json({
      data: paginatedItems, // Return only the filtered & paginated data
      totalItems, // Total items in the entire database
      totalStockout, // Total stockout items in the entire database
      totalExpired, // Total expired items in the entire database
      totalPages: Math.ceil(filteredItems.length / limitNum), // Total pages based on filtered items
      currentPage: pageNum,
    });
  } catch (error) {
    console.error("Error fetching item summary:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getItemSummary,
};
