const db = require('../db')

// Отримання відгуків для фрілансера (з аватаром з users.picture)
exports.getFreelancerReviews = (req, res) => {
	const { freelancerId } = req.params
	db.query(
		`SELECT r.*, u.picture as user_avatar FROM reviews r
		 JOIN users u ON r.client_id = u.id
		 WHERE r.freelancer_id = ? ORDER BY r.created_at DESC`,
		[freelancerId],
		(err, rows) => {
			if (err) return res.status(500).json({ error: 'Помилка сервера' })
			res.json(rows)
		}
	)
}

// Додавання нового відгуку (без image_url)
exports.addReview = (req, res) => {
	const {
		freelancer_id,
		client_id,
		rating,
		comment,
		price_min,
		price_max,
		duration_days,
		category,
	} = req.body
	db.query(
		'INSERT INTO reviews (freelancer_id, client_id, rating, comment, price_min, price_max, duration_days, category, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())',
		[
			freelancer_id,
			client_id,
			rating,
			comment,
			price_min,
			price_max,
			duration_days,
			category,
		],
		(err, result) => {
			if (err) return res.status(500).json({ error: 'Помилка сервера' })
			res.status(201).json({ id: result.insertId })
		}
	)
}
