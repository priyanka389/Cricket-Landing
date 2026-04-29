import React, { useState } from 'react'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const res = await fetch("https://cricket-landing.onrender.com/api/auth/login", {
      method: "POST",
     headers: {
  "Content-Type": "application/json",
  // Authorization: `Bearer ${localStorage.getItem("token")}`  // 🔥 ADD THIS
},
      body: JSON.stringify(formData)
    })

    // const data = await res.json()
     // ✅ SAFE RESPONSE
    const text = await res.text();

    console.log("RAW RESPONSE:", text);

    let data;

    try {
      data = JSON.parse(text);
    } catch (err) {
      console.log("JSON Parse Error:", err);
      alert("Backend returned invalid response");
      return;
    }

    console.log("Login Response:", data);

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      alert("Login Successful 🎉");

      if (data.role === "user") {
        navigate("/user/dashboard");
      } else if (data.role === "admin") {
        navigate("/admin/dashboard");
      } else if (data.role === "superadmin") {
        navigate("/superadmin/dashboard");
      }
    } else {
      alert(data.msg || "Login failed");
    }

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    alert(err.message);
  }
};

const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    try {
      const res = await axios.post(
        "https://cricket-landing.onrender.com/api/auth/google-login",
        {
          access_token: tokenResponse.access_token,
        }
      );

      const data = res.data;

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        alert("Google Login Successful 🎉");

        if (data.role === "user") {
          navigate("/user/dashboard");
        } else if (data.role === "admin") {
          navigate("/admin/dashboard");
        } else if (data.role === "superadmin") {
          navigate("/superadmin/dashboard");
        }
      }
    } catch (err) {
      console.log(err);
      alert("Google login failed");
    }
  },
  onError: () => alert("Google Login Failed"),
});

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 relative font-[Poppins]">

      {/* ✅ Updated Logo (same as your given design) */}
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
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-xl p-7 animate-fade-in">

        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome Back 👋
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Login to continue 🚀
          </p>
        </div>

        {/* Google Login */}
        <button
  onClick={() => googleLogin()}   // ✅ YE LINE ADD KI HAI
  className="w-full flex items-center justify-center gap-2 py-2.5 mb-4 border border-gray-200 rounded-lg bg-gray-50 hover:border-blue-500 transition-all hover:scale-[1.02]"
>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          <span className="text-sm text-gray-700 font-medium">
            Continue with Google
          </span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Email</label>
            <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 focus-within:border-blue-500 transition">
              <Mail size={18} className="text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent w-full outline-none text-gray-900 text-sm"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Password</label>
            <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 focus-within:border-blue-500 transition">
              <Lock size={18} className="text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="bg-transparent w-full outline-none text-gray-900 text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <span className="text-xs text-green-600 cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 bg-accent text-primary rounded-lg font-semibold hover:bg-accent/90 transition-all hover:scale-[1.02]"
          >
            Sign In
          </button>
        </form>

        {/* Signup */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate('/signup')}
            className="text-green-600 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>

      </div>
    </div>
  )
}

export default SignIn