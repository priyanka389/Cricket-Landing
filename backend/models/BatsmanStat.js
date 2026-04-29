const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  matchId: String,
  playerId: String,
  runs: { type: Number, default: 0 },
  balls: { type: Number, default: 0 },
  fours: { type: Number, default: 0 },
  sixes: { type: Number, default: 0 }
});

module.exports = mongoose.model("BatsmanStat", schema);