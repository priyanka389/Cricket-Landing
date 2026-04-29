const Team = require("../models/Team");

exports.createTeam = async (req, res) => {
  try {
    const { name, short } = req.body;

    const team = new Team({
      name,
      short,
      logo: req.file ? req.file.filename : null
    });

    await team.save();

    res.json({ msg: "Team created", team });

  } catch (err) {
    res.status(500).json({ msg: "Error" });
  }
};