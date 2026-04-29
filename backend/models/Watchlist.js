const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    matchId: String,
    teams: String,
    score: String
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Watchlist",
  watchlistSchema
);