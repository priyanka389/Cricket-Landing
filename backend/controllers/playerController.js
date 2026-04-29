const Player = require("../models/Player");

// ✅ ADD PLAYER
exports.addPlayer = async (req, res) => {
  try {
    const { name, role, team } = req.body;

    const player = new Player({ name, role, team });
    await player.save();

    res.json({ msg: "Player added", player });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error adding player" });
  }
};

// ✅ GET ALL PLAYERS
exports.getPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.json({ players });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error fetching players" });
  }
};