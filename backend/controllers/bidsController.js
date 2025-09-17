const db = require('../db')

exports.getUserBids = async (req, res) => {
	const userId = req.params.user_id
	try {
		const [bids] = await db.promise().query(
			`SELECT b.*, p.title as project_title, p.description as project_description
       FROM bids b
       JOIN projects p ON b.project_id = p.id
       WHERE b.user_id = ? ORDER BY b.created_at DESC`,
			[userId]
		)
		res.json(bids)
	} catch (error) {
		res.status(500).json({ error: 'Database error' })
	}
}
