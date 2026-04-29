const express = require("express");
const router = express.Router();

const {
  addSquad,
  getSquads,
  deleteSquad,
  updateSquad
} = require("../controllers/squadController");

router.post("/add", addSquad);
router.get("/all", getSquads);
router.delete("/delete/:id", deleteSquad);
router.put("/update/:id", updateSquad);

module.exports = router;