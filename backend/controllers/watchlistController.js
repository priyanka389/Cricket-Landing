const Watchlist = require("../models/Watchlist");

const addToWatchlist = async (req, res) => {
  try {
    const { matchId, teams, score } = req.body;

    const item = await Watchlist.create({
      userId: req.user.id,
      matchId,
      teams,
      score
    });

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getWatchlist = async (req, res) => {
  try {
    const data = await Watchlist.find({
      userId: req.user.id
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeWatchlist = async (req, res) => {
  try {
    await Watchlist.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Removed"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToWatchlist,
  getWatchlist,
  removeWatchlist
};