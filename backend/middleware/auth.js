const jwt = require('jsonwebtoken')
const db = require('../db')

const auth = (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(' ')[1]

		if (!token) {
			return res.status(401).json({ message: 'Token is not provided' })
		}

		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET || 'your-secret-key'
		)
		req.user = decoded
		next()
	} catch (error) {
		console.error('Auth middleware error:', error)
		return res.status(401).json({ message: 'Token is not valid' })
	}
}

module.exports = auth
