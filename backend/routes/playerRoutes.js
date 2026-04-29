const express = require("express");
const router = express.Router();

const { addPlayer, getPlayers } = require("../controllers/playerController");

// ✅ ADD PLAYER
router.post("/add", addPlayer);

// ✅ GET PLAYERS
router.get("/all", getPlayers);

module.exports = router;