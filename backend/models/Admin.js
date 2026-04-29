const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  active: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    default: "admin"
  }
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);