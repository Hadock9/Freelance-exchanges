const mysql = require('mysql2')
require('dotenv').config()

const db = mysql.createConnection({
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASSWORD || '',
	database: process.env.DB_NAME || 'react_app',
})

db.connect(err => {
	if (err) {
		console.error('Помилка підключення до MySQL:', err)
		return
	}
	console.log('Підключено до MySQL бази даних.')
})

// Отримати користувача за id
exports.getUserById = (userId, callback) => {
	db.query('SELECT * FROM users WHERE id = ?', [userId], (err, rows) => {
		if (err) return callback(err)
		callback(null, rows[0])
	})
}

module.exports = db
