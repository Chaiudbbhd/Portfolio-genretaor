// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  credits: { type: Number, default: 0 }, // user's available credits
  subscription: {
    plan: { type: String, enum: ["monthly", "semiannual", "annual"], default: null },
    expiry: { type: Date, default: null },
  },
});

module.exports = mongoose.model("User", userSchema);
