const express = require("express");
const router = express.Router();

const {
  addMatch,
  getMatches,
  updateMatch,
  deleteMatch, saveBall, getMatchBalls, updateMatchStatus
} = require("../controllers/matchController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// ✅ ADD MATCH (admin only)
router.post("/add", auth, role("admin", "superadmin"), addMatch);

// ✅ GET ALL MATCHES
router.get("/all", getMatches);

// ✅ UPDATE MATCH
router.put("/update/:id", updateMatch);

router.put("/status/:id", updateMatchStatus);

// ✅ DELETE MATCH
router.delete("/delete/:id", deleteMatch);

// ✅ ADD THIS
router.post("/ball", saveBall);

router.get("/balls/:id", getMatchBalls);

// ✅ GET SINGLE MATCH
router.get("/:id", async (req, res) => {
  try {
    const Match = require("../models/Match");
    const match = await Match.findById(req.params.id);
    res.json(match);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching match" });
  }
});

module.exports = router;