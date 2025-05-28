const db = require('../db')

// Отримати всіх фрілансерів з фільтрами
exports.getFreelancers = async (req, res) => {
	try {
		const {
			search,
			category,
			minPrice,
			maxPrice,
			sortBy = 'rating',
			page = 1,
			limit = 10,
		} = req.query

		let query = `
      SELECT 
        f.*,
        u.first_name,
        u.last_name,
        u.picture as avatar,
        u.email
      FROM freelancers f
      JOIN users u ON f.user_id = u.id
      WHERE f.is_available = true
    `

		const queryParams = []

		// Пошук за навичками або описом
		if (search) {
			query += ` AND (f.title LIKE ? OR f.description LIKE ? OR JSON_SEARCH(f.skills, 'one', ?) IS NOT NULL)`
			queryParams.push(`%${search}%`, `%${search}%`, search)
		}

		// Фільтр за категорією
		if (category && category !== 'all') {
			query += ` AND f.category = ?`
			queryParams.push(category)
		}

		// Фільтр за ціною
		if (minPrice) {
			query += ` AND f.hourly_rate >= ?`
			queryParams.push(minPrice)
		}
		if (maxPrice) {
			query += ` AND f.hourly_rate <= ?`
			queryParams.push(maxPrice)
		}

		// Сортування
		switch (sortBy) {
			case 'price_low':
				query += ` ORDER BY f.hourly_rate ASC`
				break
			case 'price_high':
				query += ` ORDER BY f.hourly_rate DESC`
				break
			case 'projects':
				query += ` ORDER BY f.completed_projects DESC`
				break
			default: // rating
				query += ` ORDER BY f.rating DESC`
		}

		// Пагінація
		const offset = (page - 1) * limit
		query += ` LIMIT ? OFFSET ?`
		queryParams.push(parseInt(limit), offset)

		// Виконання запиту
		const [freelancers] = await db.promise().query(query, queryParams)

		// Отримання загальної кількості
		const countQuery = query.split('LIMIT')[0]
		const [total] = await db
			.promise()
			.query(countQuery, queryParams.slice(0, -2))
		const totalCount = total.length

		// Форматування даних фрілансерів
		const formattedFreelancers = freelancers.map(freelancer => ({
			...freelancer,
			rating: Number(freelancer.rating) || 0,
			hourly_rate: Number(freelancer.hourly_rate) || 0,
			skills: JSON.parse(freelancer.skills || '[]'),
			name:
				`${freelancer.first_name || ''} ${freelancer.last_name || ''}`.trim() ||
				'Анонімний користувач',
		}))

		res.json({
			freelancers: formattedFreelancers,
			pagination: {
				total: totalCount,
				page: parseInt(page),
				limit: parseInt(limit),
				pages: Math.ceil(totalCount / limit),
			},
		})
	} catch (error) {
		console.error('Error in getFreelancers:', error)
		res.status(500).json({ error: 'Помилка при отриманні списку фрілансерів' })
	}
}

// Отримати фрілансера за ID
exports.getFreelancerById = async (req, res) => {
	try {
		const { id } = req.params
		const query = `
      SELECT 
        f.*,
        u.first_name,
        u.last_name,
        u.picture as avatar,
        u.email
      FROM freelancers f
      JOIN users u ON f.user_id = u.id
      WHERE f.id = ?
    `
		const [freelancer] = await db.promise().query(query, [id])

		if (!freelancer.length) {
			return res.status(404).json({ error: 'Фрілансер не знайдено' })
		}

		// Форматування даних фрілансера
		const formattedFreelancer = {
			...freelancer[0],
			rating: Number(freelancer[0].rating) || 0,
			hourly_rate: Number(freelancer[0].hourly_rate) || 0,
			skills: JSON.parse(freelancer[0].skills || '[]'),
			name:
				`${freelancer[0].first_name || ''} ${
					freelancer[0].last_name || ''
				}`.trim() || 'Анонімний користувач',
		}

		res.json(formattedFreelancer)
	} catch (error) {
		console.error('Error in getFreelancerById:', error)
		res
			.status(500)
			.json({ error: 'Помилка при отриманні інформації про фрілансера' })
	}
}

// Створити або оновити профіль фрілансера
exports.createOrUpdateFreelancerProfile = async (req, res) => {
	try {
		const userId = req.user.id
		const { title, description, hourly_rate, skills, category, location } =
			req.body

		// Перевірка чи існує профіль
		const [existing] = await db
			.promise()
			.query('SELECT id FROM freelancers WHERE user_id = ?', [userId])

		if (existing.length) {
			// Оновлення існуючого профілю
			await db.promise().query(
				`UPDATE freelancers 
				 SET title = ?, description = ?, hourly_rate = ?, 
					 skills = ?, category = ?, location = ?
				 WHERE user_id = ?`,
				[
					title,
					description,
					hourly_rate,
					JSON.stringify(skills),
					category,
					location,
					userId,
				]
			)
		} else {
			// Створення нового профілю
			await db.promise().query(
				`INSERT INTO freelancers 
				 (user_id, title, description, hourly_rate, skills, category, location)
				 VALUES (?, ?, ?, ?, ?, ?, ?)`,
				[
					userId,
					title,
					description,
					hourly_rate,
					JSON.stringify(skills),
					category,
					location,
				]
			)
		}

		res.json({ message: 'Профіль успішно оновлено' })
	} catch (error) {
		console.error('Error in createOrUpdateFreelancerProfile:', error)
		res.status(500).json({ error: 'Помилка при оновленні профілю' })
	}
}

// Додати відгук про фрілансера
exports.addReview = async (req, res) => {
	try {
		const { freelancerId } = req.params
		const clientId = req.user.id
		const { rating, comment } = req.body

		// Додавання відгуку
		await db.promise().query(
			`INSERT INTO freelancer_reviews 
			 (freelancer_id, client_id, rating, comment)
			 VALUES (?, ?, ?, ?)`,
			[freelancerId, clientId, rating, comment]
		)

		// Оновлення рейтингу фрілансера
		const [reviews] = await db
			.promise()
			.query(
				'SELECT AVG(rating) as avg_rating, COUNT(*) as total FROM freelancer_reviews WHERE freelancer_id = ?',
				[freelancerId]
			)

		await db
			.promise()
			.query(
				'UPDATE freelancers SET rating = ?, total_reviews = ? WHERE id = ?',
				[reviews[0].avg_rating, reviews[0].total, freelancerId]
			)

		res.json({ message: 'Відгук успішно додано' })
	} catch (error) {
		console.error('Error in addReview:', error)
		res.status(500).json({ error: 'Помилка при додаванні відгуку' })
	}
}
