const express = require("express");
const router = express.Router();

const { createTeam } = require("../controllers/teamController");
const upload = require("../middleware/upload");

// 🔥 YEH IMPORTANT LINE
router.post("/add", upload.single("logo"), createTeam);

router.get("/all", async (req, res) => {
  const teams = await require("../models/Team").find();
  res.json({ teams });
});

module.exports = router;