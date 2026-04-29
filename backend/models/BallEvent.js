const mongoose = require("mongoose");

const ballSchema = new mongoose.Schema({
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: "Match" },

  over: Number,
  ball: Number,

  striker: String,
  bowler: String,

  runs: Number,
  extraType: String,
  wicketType: String
}, { timestamps: true });

module.exports = mongoose.model("BallEvent", ballSchema);