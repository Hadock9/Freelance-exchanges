const express = require('express')
const router = express.Router()
const bidsController = require('../controllers/bidsController')

router.get('/user/:user_id', bidsController.getUserBids)

module.exports = router
