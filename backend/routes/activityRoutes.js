const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");

// 🔥 GET ACTIVITIES
router.get("/all", async (req, res) => {
  try {
    const activities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({ activities });

  } catch (err) {
    res.status(500).json({ msg: "Error fetching activities" });
  }
});

module.exports = router;