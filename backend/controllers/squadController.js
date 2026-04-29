const Squad = require("../models/Squad");

// ✅ ADD
exports.addSquad = async (req, res) => {
  try {
    const squad = await Squad.create(req.body);
    res.json({ msg: "Squad added", squad });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error adding squad" });
  }
};

// ✅ GET ALL
exports.getSquads = async (req, res) => {
  try {
    const squads = await Squad.find();
    res.json({ squads });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching squads" });
  }
};

// ✅ DELETE
exports.deleteSquad = async (req, res) => {
  try {
    await Squad.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting" });
  }
};

// ✅ UPDATE
exports.updateSquad = async (req, res) => {
  try {
    const squad = await Squad.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(squad);
  } catch (err) {
    res.status(500).json({ msg: "Error updating" });
  }
};