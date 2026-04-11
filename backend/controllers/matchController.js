const Match = require('../models/Match')

// add match (admin)
exports.addMatch = async (req, res) => {
  const match = await Match.create(req.body)
  res.json(match)
}

// get matches (user)
exports.getMatches = async (req, res) => {
  const matches = await Match.find()
  res.json(matches)
}