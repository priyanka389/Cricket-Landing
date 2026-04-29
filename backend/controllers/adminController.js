const Admin = require("../models/Admin");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");

exports.createAdmin = async (req, res) => {
  try {
    const { name, email } = req.body;

    // 🔥 generate token
    const token = crypto.randomBytes(32).toString("hex");

    // 🔥 save in Admin collection (IMPORTANT)
    const newAdmin = new Admin({
      name,
      email,
      active: true
    });

    await newAdmin.save();

    // 🔥 link
    const link = `http://localhost:5173/set-password/${token}`;

    // 🔥 send email
    await mailSender(
      email,
      "Set your password",
      `<h2>Welcome Admin</h2>
       <p>Click to set password:</p>
       <a href="${link}">Set Password</a>`
    );

    res.json({
      success: true,
      msg: "Admin created & email sent"
    });

  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      msg: "Error creating admin"
    });
  }
};