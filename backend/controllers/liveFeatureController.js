const LiveChat = require("../models/LiveChat");
const Poll = require("../models/Poll");

/* Chat Send */
exports.sendMessage = async (req, res) => {
  try {
    const { matchId, username, message } = req.body;

    await LiveChat.create({
      matchId,
      username,
      message
    });

    res.json({ message: "Sent" });

  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
};

/* Chat Get */
exports.getMessages = async (req, res) => {
  try {
    const data = await LiveChat.find({
      matchId: req.params.id
    })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(data.reverse());

  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
};

/* Poll Vote */
exports.votePoll = async (req, res) => {
  try {
    const { matchId, team } = req.body;

    let poll = await Poll.findOne({ matchId });

    if (!poll) {
      poll = await Poll.create({
        matchId,
        teamA: 0,
        teamB: 0
      });
    }

    if (team === "A") {
      poll.teamA += 1;
    } else {
      poll.teamB += 1;
    }

    await poll.save();

    res.json({ message: "Vote Added" });

  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
};

/* Poll Get */
exports.getPoll = async (req, res) => {
  try {
    let poll = await Poll.findOne({
      matchId: req.params.id
    });

    if (!poll) {
      poll = {
        teamA: 0,
        teamB: 0
      };
    }

    res.json(poll);

  } catch (error) {
    res.status(500).json({ msg: "Error" });
  }
};