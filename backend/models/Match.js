const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  teamA: String,
  teamB: String,
  date: String,
  time: String,
  venue: String,
  type: String,
  category: {
    type: String,
    default: "IPL"
  },

  // ✅ ADDED (live scoring)
  score: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  balls: { type: Number, default: 0 },
  status: { type: String, default: "upcoming" },
  innings: { type: Number, default: 1 }, // 1 or 2
target: { type: Number, default: 0 },
});

module.exports = mongoose.model("Match", matchSchema);