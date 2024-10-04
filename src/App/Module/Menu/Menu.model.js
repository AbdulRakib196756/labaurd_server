const { Schema, default: mongoose } = require("mongoose");

const menuchema = new Schema({
  name: String,

  image: String,
  category: String,
  price: String,
});

const Menu = mongoose.model("menu", menuchema, "menu");

module.exports = Menu;
