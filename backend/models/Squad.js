const mongoose = require("mongoose");

const squadSchema = new mongoose.Schema({
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match"
  },
  team: String,
  players: [String], // player IDs
  captain: String,
  viceCaptain: String
}, { timestamps: true });

module.exports = mongoose.model("Squad", squadSchema);