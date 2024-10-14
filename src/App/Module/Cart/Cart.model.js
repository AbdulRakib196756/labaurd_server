const { Schema, default: mongoose } = require("mongoose");

const cartschema = new Schema(
  {
    useremail: String,
    menuid: String,
  },
  { Timestamp: true }
);

const Cart = mongoose.model("cart", cartschema, "carts");

module.exports = Cart;
