const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: String,
  short: String,
  logo: String
});

module.exports = mongoose.model("Team", teamSchema);