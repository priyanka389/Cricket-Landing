const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Otp = require('../models/Otp')

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
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // ✅ check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists, please login"
      });
    }

    // generate otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // save in DB
    await Otp.create({ email, otp });

    console.log("OTP is:", otp);

    res.json({
      success: true,
      message: "OTP sent"
    });

  } catch (err) {
    console.log(err);
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