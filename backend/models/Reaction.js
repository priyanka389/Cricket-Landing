const mongoose = require("mongoose");

const reactionSchema =
new mongoose.Schema({
  matchId: String,
  heart: {
    type: Number,
    default: 0
  },
  fire: {
    type: Number,
    default: 0
  },
  wow: {
    type: Number,
    default: 0
  },
  clap: {
    type: Number,
    default: 0
  }
});

module.exports =
mongoose.model(
"Reaction",
reactionSchema
);