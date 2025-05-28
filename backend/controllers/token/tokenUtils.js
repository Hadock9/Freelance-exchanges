const jwt = require('jsonwebtoken')

// Функція для генерації токена
function generateToken(user) {
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
			first_name: user.first_name,
			last_name: user.last_name,
			date_of_birth: user.date_of_birth,
			country: user.country,
			gender: user.gender,
			phone_number: user.phone_number,
			picture: user.picture,
			bonus_money: user.bonus_money,
			created_at: user.created_at,
			role: user.role,
		},
		process.env.JWT_SECRET || 'your-secret-key',
		{ expiresIn: '24h' }
	)
}

module.exports = generateToken
