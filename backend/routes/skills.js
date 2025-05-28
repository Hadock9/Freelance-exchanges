const express = require('express')
const router = express.Router()
const skillsController = require('../controllers/skillsController')

router.get('/', skillsController.getAllSkills)
router.get('/categories', skillsController.getSkillCategories)

module.exports = router
