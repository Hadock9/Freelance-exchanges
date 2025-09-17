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

	getProjectsByCategory: (req, res) => {
		const { category } = req.params
		db.query(
			`SELECT p.*, CONCAT(u.first_name, ' ', COALESCE(u.last_name, '')) as owner_name, u.picture as owner_avatar
			FROM projects p
			LEFT JOIN users u ON p.user_id = u.id
			WHERE p.category = ? ORDER BY p.created_at DESC`,
			[category],
			(err, results) => {
				if (err) {
					console.error('Error fetching projects by category:', err)
					return res.status(500).json({ error: 'Database error' })
				}
				res.json(results)
			}
		)
	},

	getProjectById: (req, res) => {
		const { id } = req.params
		db.query(
			`SELECT p.*, 
			CONCAT(u.first_name, ' ', COALESCE(u.last_name, '')) as owner_name, 
			u.picture as owner_avatar 
			FROM projects p 
			LEFT JOIN users u ON p.user_id = u.id 
			WHERE p.id = ?`,
			[id],
			(err, results) => {
				if (err) {
					console.error('Error fetching project details:', err)
					return res.status(500).json({ error: 'Database error' })
				}
				if (results.length === 0) {
					return res.status(404).json({ error: 'Project not found' })
				}
				res.json(results[0])
			}
		)
	},
}

module.exports = projectsController
