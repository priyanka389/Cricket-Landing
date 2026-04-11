const express = require('express')
const app = express()
const cors = require('cors')
const authRoutes = require("./routes/authRoutes")
require('dotenv').config()

// middleware
app.use(cors())
app.use(express.json())

// DB connect
require('./config/db')()

// routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/match', require('./routes/matchRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))
app.use("/api/auth", authRoutes)

app.get('/', (req, res) => {
  res.send("Backend running 🚀")
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})