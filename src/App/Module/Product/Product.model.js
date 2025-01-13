const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Product location is required"],
      trim: true,
    },
    expirationDate: {
      type: Date,
      required: [true, "Expiration date is required"],
      validate: {
        validator: function (value) {
          return value >= new Date();
        },
        message: "Expiration date must be in the future",
      },
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: [true, "Item ID is required"],
    },
    daysUntilExpiration: {
      type: Number,
      default: null, // This will be updated by a cron job
    },
  },
  { timestamps: true }
);

// Create an index on expirationDate for efficient queries
ProductSchema.index({ expirationDate: 1 });

const Product = mongoose.model("Product", ProductSchema, "Products");

module.exports = Product;
