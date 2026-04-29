const express = require('express')
const router = express.Router()
const { signup, login , sendOtp,verifyOTP,googleLogin, setPassword } = require('../controllers/authController')


router.post('/signup', signup)
router.post('/login', login)
router.post("/send-otp", sendOtp)
router.post("/verify-otp", verifyOTP);
router.post("/google-login", googleLogin);
router.post("/set-password", setPassword);

module.exports = router