const db = require('../db')

// Отримати всі скіли
exports.getAllSkills = async (req, res) => {
	try {
		const [skills] = await db
			.promise()
			.query('SELECT * FROM skills ORDER BY category, name')
		res.json(skills)
	} catch (error) {
		res.status(500).json({ error: 'Database error' })
	}
}

// Отримати всі категорії скілів
exports.getSkillCategories = async (req, res) => {
	try {
		const [rows] = await db
			.promise()
			.query('SELECT DISTINCT category FROM skills')
		res.json(rows.map(r => r.category))
	} catch (error) {
		res.status(500).json({ error: 'Database error' })
	}
}
