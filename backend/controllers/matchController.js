const Activity = require("../models/Activity");
const Match = require("../models/Match");


// ✅ LIVE BALL SAVE (ADD ONLY)
const BallEvent = require("../models/BallEvent");
const BatsmanStat = require("../models/BatsmanStat");
const BowlerStat = require("../models/BowlerStat");

// ✅ ADD MATCH
exports.addMatch = async (req, res) => {
  try {
    const { teamA, teamB } = req.body;

    const match = await Match.create(req.body);

    await Activity.create({
      text: `🏏 ${teamA} vs ${teamB} match added`
    });

    res.json(match);

  } catch (err) {
    res.status(500).json({ msg: "Error adding match" });
  }
};

// ✅ GET MATCHES
exports.getMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    res.json({ matches });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching matches" });
  }
};

// ✅ UPDATE MATCH
exports.updateMatch = async (req, res) => {
  try {
    const { teamA, teamB } = req.body;

    const match = await Match.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!match) {
      return res.status(404).json({ msg: "Match not found" });
    }

    await Activity.create({
      text: `✏️ ${teamA} vs ${teamB} match updated`
    });

    res.json(match);

  } catch (err) {
    res.status(500).json({ msg: "Error updating match" });
  }
};

// ✅ DELETE MATCH (ADD THIS 🔥)
exports.deleteMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);

    if (!match) {
      return res.status(404).json({ msg: "Match not found" });
    }

    await Activity.create({
      text: `❌ ${match.teamA} vs ${match.teamB} match deleted`
    });

    res.json({ msg: "Match deleted" });

  } catch (err) {
    res.status(500).json({ msg: "Error deleting match" });
  }
};





exports.saveBall = async (req, res) => {
  try {
    const {
      matchId,
      striker,
      bowler,
      runs,
      extraType,
      wicketType,
      balls
    } = req.body;

    const over = Math.floor(balls / 6);
    const ball = balls % 6;

    // 1️⃣ save ball
    await BallEvent.create({
      matchId,
      over,
      ball,
      striker,
      bowler,
      runs,
      extraType,
      wicketType
    });

    // 2️⃣ update match
    await Match.findByIdAndUpdate(matchId, {
      $inc: {
        score: runs,
        balls: extraType ? 0 : 1,
        wickets: wicketType ? 1 : 0
      }
    });

    // 3️⃣ batsman
    await BatsmanStat.findOneAndUpdate(
      { matchId, playerId: striker },
      {
        $inc: {
          runs: runs,
          balls: extraType ? 0 : 1,
          fours: runs === 4 ? 1 : 0,
          sixes: runs === 6 ? 1 : 0
        }
      },
      { upsert: true }
    );

    // 4️⃣ bowler
    await BowlerStat.findOneAndUpdate(
      { matchId, playerId: bowler },
      {
        $inc: {
          runs: runs,
          balls: extraType ? 0 : 1,
          wickets: wicketType ? 1 : 0
        }
      },
      { upsert: true }
    );

    res.json({ success: true });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error saving ball" });
  }
};


exports.getMatchBalls = async (req, res) => {
  try {
    const BallEvent = require("../models/BallEvent");

    const balls = await BallEvent.find({
      matchId: req.params.id
    }).sort({ createdAt: 1 });

    res.json(balls);

  } catch (err) {
    res.status(500).json({ msg: "Error fetching balls" });
  }
};


// ✅ NEW (ADD ONLY)
exports.updateMatchStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const match = await Match.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(match);

  } catch (err) {
    res.status(500).json({ msg: "Error updating status" });
  }
};