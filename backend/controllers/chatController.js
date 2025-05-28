const db = require('../db')

const chatController = {
	// Create a new chat room
	createChatRoom: (req, res) => {
		try {
			const userId = req.user.id // Get user ID from auth middleware

			// Create chat room
			db.query(
				'INSERT INTO chat_rooms (created_at, updated_at) VALUES (NOW(), NOW())',
				(err, result) => {
					if (err) {
						console.error('Error creating chat room:', err)
						return res.status(500).json({ message: 'Error creating chat room' })
					}

					const chatRoomId = result.insertId

					// Add current user as participant
					db.query(
						'INSERT INTO chat_participants (chat_room_id, user_id) VALUES (?, ?)',
						[chatRoomId, userId],
						err => {
							if (err) {
								console.error('Error adding participant:', err)
								return res
									.status(500)
									.json({ message: 'Error adding participant' })
							}

							res.json({ id: chatRoomId })
						}
					)
				}
			)
		} catch (error) {
			console.error('Error creating chat room:', error)
			res.status(500).json({ message: 'Error creating chat room' })
		}
	},

	// Add participant to chat room
	addParticipant: (req, res) => {
		try {
			const { chat_room_id, user_id } = req.body

			db.query(
				'INSERT INTO chat_participants (chat_room_id, user_id) VALUES (?, ?)',
				[chat_room_id, user_id],
				err => {
					if (err) {
						console.error('Error adding participant:', err)
						return res.status(500).json({ message: 'Error adding participant' })
					}

					res.json({ message: 'Participant added successfully' })
				}
			)
		} catch (error) {
			console.error('Error adding participant:', error)
			res.status(500).json({ message: 'Error adding participant' })
		}
	},

	// Send a message
	sendMessage: (req, res) => {
		try {
			const { chat_room_id, message } = req.body
			const sender_id = req.user.id

			db.query(
				'INSERT INTO chat_messages (chat_room_id, sender_id, message, is_read, created_at) VALUES (?, ?, ?, false, NOW())',
				[chat_room_id, sender_id, message],
				err => {
					if (err) {
						console.error('Error sending message:', err)
						return res.status(500).json({ message: 'Error sending message' })
					}

					res.json({ message: 'Message sent successfully' })
				}
			)
		} catch (error) {
			console.error('Error sending message:', error)
			res.status(500).json({ message: 'Error sending message' })
		}
	},

	// Get chat messages
	getMessages: (req, res) => {
		try {
			const { chat_room_id } = req.params

			db.query(
				`SELECT m.*, u.first_name, u.picture 
				 FROM chat_messages m 
				 JOIN users u ON m.sender_id = u.id 
				 WHERE m.chat_room_id = ? 
				 ORDER BY m.created_at ASC`,
				[chat_room_id],
				(err, messages) => {
					if (err) {
						console.error('Error getting messages:', err)
						return res.status(500).json({ message: 'Error getting messages' })
					}

					res.json(messages)
				}
			)
		} catch (error) {
			console.error('Error getting messages:', error)
			res.status(500).json({ message: 'Error getting messages' })
		}
	},

	// Get user's chat rooms
	getUserChats: (req, res) => {
		try {
			const { user_id } = req.params

			// Спочатку отримуємо всі чати користувача
			db.query(
				`SELECT DISTINCT cr.*, 
				 (SELECT message FROM chat_messages 
				  WHERE chat_room_id = cr.id 
				  ORDER BY created_at DESC LIMIT 1) as last_message,
				 (SELECT created_at FROM chat_messages 
				  WHERE chat_room_id = cr.id 
				  ORDER BY created_at DESC LIMIT 1) as last_message_time
				 FROM chat_rooms cr
				 JOIN chat_participants cp ON cr.id = cp.chat_room_id
				 WHERE cp.user_id = ?
				 ORDER BY last_message_time DESC`,
				[user_id],
				(err, chats) => {
					if (err) {
						console.error('Error getting user chats:', err)
						return res.status(500).json({ message: 'Error getting user chats' })
					}

					if (!chats.length) return res.json([])

					// Для кожного чату отримуємо учасників
					let completed = 0
					chats.forEach((chat, idx) => {
						db.query(
							`SELECT u.id, u.first_name, u.picture
							 FROM chat_participants cp
							 JOIN users u ON cp.user_id = u.id
							 WHERE cp.chat_room_id = ?`,
							[chat.id],
							(err, participants) => {
								chats[idx].participants = participants || []
								completed++
								if (completed === chats.length) {
									res.json(chats)
								}
							}
						)
					})
				}
			)
		} catch (error) {
			console.error('Error getting user chats:', error)
			res.status(500).json({ message: 'Error getting user chats' })
		}
	},

	// Mark messages as read
	markAsRead: (req, res) => {
		try {
			const { chat_room_id, user_id } = req.body

			db.query(
				'UPDATE chat_messages SET is_read = true WHERE chat_room_id = ? AND sender_id != ?',
				[chat_room_id, user_id],
				err => {
					if (err) {
						console.error('Error marking messages as read:', err)
						return res
							.status(500)
							.json({ message: 'Error marking messages as read' })
					}

					res.json({ message: 'Messages marked as read' })
				}
			)
		} catch (error) {
			console.error('Error marking messages as read:', error)
			res.status(500).json({ message: 'Error marking messages as read' })
		}
	},

	// Get chat participants
	getParticipants: (req, res) => {
		try {
			const { chat_room_id } = req.params

			db.query(
				`SELECT u.id, u.first_name, u.picture 
				 FROM chat_participants cp 
				 JOIN users u ON cp.user_id = u.id 
				 WHERE cp.chat_room_id = ?`,
				[chat_room_id],
				(err, participants) => {
					if (err) {
						console.error('Error getting participants:', err)
						return res
							.status(500)
							.json({ message: 'Error getting participants' })
					}

					res.json(participants)
				}
			)
		} catch (error) {
			console.error('Error getting participants:', error)
			res.status(500).json({ message: 'Error getting participants' })
		}
	},
}

module.exports = chatController
