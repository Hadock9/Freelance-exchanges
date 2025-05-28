const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/auth')
const newsRoutes = require('./routes/news')
const commentRoutes = require('./routes/comments')
const notificationRoutes = require('./routes/notifications')
const userRoutes = require('./routes/user')
const supportRoutes = require('./routes/support')
const freelancerRoutes = require('./routes/freelancersRoutes')
const skillRoutes = require('./routes/skills')
const reviewRoutes = require('./routes/reviews')
const chatRoutes = require('./routes/chatRoutes')

const path = require('path')

const app = express()

// Налаштування CORS
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
)

app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Використання маршрутів
app.use('/api/auth', authRoutes)
app.use('/api/news', newsRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/user', userRoutes)
app.use('/api/support', supportRoutes)
app.use('/api/freelancers', freelancerRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/projects', require('./routes/projects'))

// Обробка помилок
app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).json({
		error: 'Щось пішло не так!',
		message: process.env.NODE_ENV === 'development' ? err.message : undefined,
	})
})

// Обробка 404
app.use((req, res) => {
	res.status(404).json({ error: 'Сторінку не знайдено' })
})

module.exports = app
