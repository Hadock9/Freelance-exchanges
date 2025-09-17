const express = require('express')
const router = express.Router()
const projectsController = require('../controllers/projectsController')
const auth = require('../middleware/auth')

// ...інші маршрути...

// Отримати всі проекти користувача
router.get('/user/:user_id', auth, projectsController.getUserProjects)

// Отримати проекти за категорією
router.get('/category/:category', projectsController.getProjectsByCategory)

// Отримати деталі проекту за ID
router.get('/:id', projectsController.getProjectById)

module.exports = router
