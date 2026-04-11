const mongoose = require('mongoose')

const matchSchema = new mongoose.Schema({
  teamA: String,
  teamB: String,
  scoreA: String,
  scoreB: String,
  status: String
})

module.exports = mongoose.model("Match", matchSchema)