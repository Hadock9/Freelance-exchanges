const db = require('../db')

const projectsController = {
	getUserProjects: (req, res) => {
		const { user_id } = req.params
		db.query(
			'SELECT * FROM projects WHERE user_id = ? ORDER BY created_at DESC',
			[user_id],
			(err, results) => {
				if (err) {
					console.error('Error fetching user projects:', err)
					return res.status(500).json({ error: 'Database error' })
				}
				res.json(results)
			}
		)
	},
}

module.exports = projectsController
