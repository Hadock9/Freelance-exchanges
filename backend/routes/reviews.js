const express = require('express')
const router = express.Router()
const reviewsController = require('../controllers/reviewsController')

// Отримання відгуків для фрілансера
router.get('/freelancer/:freelancerId', reviewsController.getFreelancerReviews)

// Додавання нового відгуку
router.post('/', reviewsController.addReview)

module.exports = router
