const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
  matchId: String,
  teamA: Number,
  teamB: Number
});

module.exports =
mongoose.model("Poll", pollSchema);