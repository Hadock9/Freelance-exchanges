const express = require('express')
const router = express.Router()
const freelancersController = require('../controllers/freelancersController')
const authMiddleware = require('../middleware/authMiddleware')

// Публічні роути
router.get('/', freelancersController.getFreelancers)
router.get('/:id', freelancersController.getFreelancerById)

// Захищені роути (потребують аутентифікації)
router.post(
	'/profile',
	authMiddleware,
	freelancersController.createOrUpdateFreelancerProfile
)
router.put(
	'/profile',
	authMiddleware,
	freelancersController.createOrUpdateFreelancerProfile
)
router.post(
	'/:freelancerId/reviews',
	authMiddleware,
	freelancersController.addReview
)

module.exports = router
