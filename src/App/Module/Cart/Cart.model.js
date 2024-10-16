const { Schema, default: mongoose } = require("mongoose");

const cartschema = new Schema(
  {
    useremail: String,
    menuid: {
      type: Schema.Types.ObjectId,
      ref: "menu",
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("cart", cartschema, "carts");

module.exports = Cart;
