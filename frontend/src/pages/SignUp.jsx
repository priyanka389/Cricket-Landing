import React, { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // ✅ SEND OTP
  const sendOTP = async () => {
    if (!formData.email) return alert("Enter email first")

    try {
  setLoading(true);

  const res = await fetch("https://cricket-landing.onrender.com/api/auth/send-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email: formData.email })
  });

  const text = await res.text();
  const data = JSON.parse(text);

  console.log(data);

  if (data.success) {
    setOtpSent(true);
    alert("OTP sent 📩");
  } else {
    alert(data.message);

    if (data.message === "User already exists, please login") {
      navigate("/signin");
    }
  }

} catch (err) {
  console.log(err);
  alert("Error sending OTP");
}
  }

  // ✅ VERIFY OTP (NEW)
  const verifyOTP = async () => {
    if (!formData.otp) return alert("Enter OTP")

    try {
      setLoading(true)

      const res = await fetch("https://cricket-landing.onrender.com/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp
        })
      })

      const data = await res.json()

      if (data.success) {
        setOtpVerified(true)
        alert("OTP Verified ✅")
      } else {
        alert("Invalid OTP ❌")
      }

    } catch (err) {
      alert("Error verifying OTP")
    } finally {
      setLoading(false)
    }
  }

  // ✅ SIGNUP
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!otpVerified) {
      return alert("Please verify OTP first")
    }

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match")
    }

    try {
      setLoading(true)

      const res = await fetch("https://cricket-landing.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      console.log("Signup Response:", data)

      if (data.success) {
        alert("Signup successful 🎉")
        navigate('/signin')
      } else {
        alert(data.message)
      }

    } catch (err) {
      alert("Error during signup")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 relative font-[Poppins]">

      {/* Logo */}
      <div
        className="absolute top-5 left-6 flex items-center gap-2 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-lg">C</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800 tracking-wide">
            Cric<span className="text-green-600">Stream</span>
          </h1>
          <p className="text-xs text-gray-500 -mt-1">Live</p>
        </div>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl p-7">

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Create Account 🚀
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Join CricStream today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Full Name</label>
            <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2">
              <User size={18} className="text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="bg-transparent w-full outline-none text-gray-900 text-sm"
                required
              />
            </div>
          </div>

          {/* Email + OTP */}
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Email</label>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 w-full">
                <Mail size={18} className="text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-transparent w-full outline-none text-gray-900 text-sm"
                  required
                />
              </div>

              <button
                type="button"
                onClick={sendOTP}
                disabled={loading}
                className="px-3 bg-green-600 text-white rounded-lg text-sm font-semibold"
              >
                Send OTP
              </button>
            </div>
          </div>

          {/* OTP + VERIFY BUTTON */}
          {otpSent && (
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Enter OTP</label>

              <div className="flex gap-2">
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-gray-900 text-sm outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={verifyOTP}
                  className="px-3 bg-green-600 text-white rounded-lg text-sm"
                >
                  Verify
                </button>
              </div>
            </div>
          )}

          {/* Password (DISABLED until OTP verified) */}
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Password</label>
            <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2">
              <Lock size={18} className="text-gray-400" />
              <input
                type="password"
                name="password"
                disabled={!otpVerified}
                value={formData.password}
                onChange={handleChange}
                className="bg-transparent w-full outline-none text-gray-900 text-sm"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Confirm Password</label>
            <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2">
              <Lock size={18} className="text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                disabled={!otpVerified}
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-transparent w-full outline-none text-gray-900 text-sm"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 bg-green-600 text-white rounded-lg font-semibold"
          >
            Sign Up
          </button>

        </form>
      </div>
    </div>
  )
}

export default SignUp