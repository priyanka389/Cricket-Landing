const express = require('express')
const router = express.Router()
const { addMatch, getMatches } = require('../controllers/matchController')

const auth = require('../middleware/authMiddleware')
const role = require('../middleware/roleMiddleware')

// admin only
router.post('/add', auth, role('admin', 'superadmin'), addMatch)

// all users
router.get('/', getMatches)

module.exports = router