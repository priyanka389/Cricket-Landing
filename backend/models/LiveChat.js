const mongoose = require("mongoose");

const liveChatSchema =
new mongoose.Schema({
  matchId: String,
  username: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 21600
  }
});

module.exports =
mongoose.model(
"LiveChat",
liveChatSchema
);