const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const Otp = require('../models/Otp')
const axios = require("axios");

// ================= SIGNUP (FINAL) =================
exports.signup = async (req, res) => {
    console.log("Signup API hit")
  try {
    const { name, email, password, otp } = req.body;

    // 🔥 latest OTP
    const recentOTP = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!recentOTP) {
      return res.json({
        success: false,
        msg: "OTP expired"
      });
    }

    // 🔥 verify OTP
    if (recentOTP.otp !== otp) {
      return res.json({
        success: false,
        msg: "Invalid OTP"
      });
    }

    // check user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        msg: "User already exists"
      });
    }

    // 🔐 hash password
    const hashed = await bcrypt.hash(password, 10);

    // create user
    await User.create({
      name,
      email,
      password: hashed,
      role: "user"
    });

    res.json({
      success: true,
      msg: "Signup successful"
    });

  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      msg: "Signup failed"
    });
  }
};



// ================= LOGIN =================
exports.login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) return res.status(400).json({ msg: "User not found" })

  const match = await bcrypt.compare(password, user.password)
  if (!match) return res.status(400).json({ msg: "Wrong password" })

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET
  )

  res.json({
  success: true,
  token,
  role: user.role
})
}


// ================= SEND OTP =================
// ================= SEND OTP =================
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists, please login"
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.create({ email, otp });

    // 🔥 EMAIL SEND START
    const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`,
    });
    // 🔥 EMAIL SEND END

    console.log("OTP sent to email:", email);

    res.json({
      success: true,
      message: "OTP sent to email"
    });

  } catch (err) {
    console.log("EMAIL ERROR:", err);
    res.json({
      success: false,
      message: "Error sending OTP"
    });
  }
};

// ================= VERIFY OTP =================
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const recentOTP = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!recentOTP) {
      return res.json({
        success: false,
        message: "OTP expired"
      });
    }

    if (recentOTP.otp === otp) {
      return res.json({
        success: true,
        message: "OTP verified"
      });
    }

    return res.json({
      success: false,
      message: "Invalid OTP"
    });

  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Error verifying OTP"
    });
  }
};


// OAuth

exports.googleLogin = async (req, res) => {
  const { access_token } = req.body;

  try {
    const googleRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`
    );

    const { email, name } = googleRes.data;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        username: name,
        password: "google_auth",
      });
    }

    const token = "dummy_token"; // ya JWT use karo

    res.json({
      token,
      role: "user",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Google login error" });
  }
};


// 


exports.setPassword = async (req, res) => {
  try {
    const { token, password } = req.body

    const user = await User.findOne({ resetToken: token })

    if (!user) {
      return res.json({ success: false, msg: "Invalid link" })
    }

    const hashed = await bcrypt.hash(password, 10)

    user.password = hashed
    user.resetToken = null

    await user.save()

    res.json({ success: true, msg: "Password set successfully" })

  } catch (err) {
    res.json({ success: false, msg: "Error setting password" })
  }
}