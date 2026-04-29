const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: String,
  role: String,
  team: String
});

module.exports = mongoose.model("Player", playerSchema);