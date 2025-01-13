const mongoose = require("mongoose");
const { Schema } = mongoose;

const Userschema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["User", "Admin"],
    default: "User",
  },
});

const User = mongoose.model("user", Userschema, "users");

module.exports = User;
