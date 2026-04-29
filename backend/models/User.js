const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  resetToken: String, 
  role: {
    type: String,
    enum: ['user', 'admin', 'superadmin'],
    default: 'user'
  },

  // ✅ NEW
  team: { type: String, default: "India 🇮🇳" },
  plan: { type: String, default: "Free" },
  planExpiry: {
  type: Date,
  default: null
},
  avatar: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("User", userSchema)