const { Schema, default: mongoose, model } = require("mongoose");

const reviewschema = new Schema({
  name: String,
  details: String,
  rating: String,
});

const reviewmodel = mongoose.model("review", reviewschema, "review");

module.exports = reviewmodel;
