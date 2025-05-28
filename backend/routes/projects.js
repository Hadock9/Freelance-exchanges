const express = require('express')
const router = express.Router()
const projectsController = require('../controllers/projectsController')
const auth = require('../middleware/auth')

// ...інші маршрути...

// Отримати всі проекти користувача
router.get('/user/:user_id', auth, projectsController.getUserProjects)

module.exports = router
