const express = require('express')
const router = express.Router()
const { createAdmin } = require('../controllers/adminController')

const auth = require('../middleware/authMiddleware')
const role = require('../middleware/roleMiddleware')

router.post('/create-admin', auth, role('superadmin'), createAdmin)

module.exports = router