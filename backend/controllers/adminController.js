const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.createAdmin = async (req, res) => {
  const { name, email, password } = req.body

  const hashed = await bcrypt.hash(password, 10)

  const admin = await User.create({
    name,
    email,
    password: hashed,
    role: 'admin'
  })

  res.json(admin)
}