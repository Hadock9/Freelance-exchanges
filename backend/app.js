const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const newsRoutes = require('./routes/news')
const commentsRoutes = require('./routes/comments')
const notificationsRoutes = require('./routes/notifications')
const userRoutes = require('./routes/user')
const supportRoutes = require('./routes/support')
const freelancersRoutes = require('./routes/freelancersRoutes')
const skillsRoutes = require('./routes/skills')

const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Використання маршрутів
app.use('/api/auth', authRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/comments', commentsRoutes)
app.use('/api/notifications', notificationsRoutes)
app.use('/api/user', userRoutes)
app.use('/api/support', supportRoutes)
app.use('/api/freelancers', freelancersRoutes)
app.use('/api/skills', skillsRoutes)

module.exports = app
