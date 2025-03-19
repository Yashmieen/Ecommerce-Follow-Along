const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  profilePic: { type: String },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart'
  }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);