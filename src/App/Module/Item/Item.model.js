const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Unit: {
      type: String,
      enum: ["Box", "Pc"],
      required: true,
    },
    Category: {
      type: String,
      enum: ["Lab Consumables", "Lab Reagent", "Micro Reagent"],
      required: true,
    },
    Hazard: {
      type: String,
    },
    Instruction: {
      type: String,
    },
    Incompatibility: {
      type: String,
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema, "Items");

module.exports = Item;
