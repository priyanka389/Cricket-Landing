const express = require('express')

const router = express.Router()
const { createAdmin } = require('../controllers/adminController')
const Admin = require("../models/Admin"); // 🔥 model import
const auth = require('../middleware/authMiddleware')
const role = require('../middleware/roleMiddleware')
const User = require("../models/User");




// 🔥 GET ALL ADMINS


router.get("/get-admins", async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });

    res.json({ admins });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/create-admin", async (req, res) => {
  try {
    console.log("BODY:", req.body);   // 🔥 ADD THIS

    const { name, email } = req.body;

    const newAdmin = new Admin({
      name,
      email
    });

    await newAdmin.save();

    console.log("SAVED:", newAdmin);  // 🔥 ADD THIS

    res.json({ msg: "Admin created successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error creating admin" });
  }
});


router.delete("/delete-admin/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id); // 🔥 अगर User model use कर रही है

    res.json({ msg: "Admin deleted successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error deleting admin" });
  }
});




router.get("/get-users", async (req, res) => {
  try {
    const users = await User.find({ role: "user" });

    res.json({ users });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});
module.exports = router







