const WebSocket = require('ws')
const jwt = require('jsonwebtoken')

function setupWebSocket(server) {
	const wss = new WebSocket.Server({ server })
	const clients = new Map()

	wss.on('connection', (ws, req) => {
		// Отримуємо токен з URL
		const token = new URL(req.url, 'ws://localhost').searchParams.get('token')

		try {
			// Перевіряємо токен
			const decoded = jwt.verify(token, process.env.JWT_SECRET)
			const userId = decoded.id

			// Зберігаємо з'єднання
			clients.set(userId, ws)

			// Відправляємо повідомлення про підключення
			ws.send(
				JSON.stringify({
					type: 'connection',
					status: 'connected',
					userId: userId,
				})
			)

			ws.on('message', message => {
				try {
					const data = JSON.parse(message)

					// Пересилаємо повідомлення іншим учасникам чату
					if (data.type === 'message') {
						const targetClient = clients.get(data.recipientId)
						if (targetClient) {
							targetClient.send(
								JSON.stringify({
									type: 'message',
									senderId: userId,
									chatRoomId: data.chatRoomId,
									message: data.message,
									timestamp: new Date().toISOString(),
								})
							)
						}
					}
				} catch (error) {
					console.error('Помилка обробки повідомлення:', error)
				}
			})

			ws.on('close', () => {
				clients.delete(userId)
			})
		} catch (error) {
			console.error('Помилка автентифікації WebSocket:', error)
			ws.close()
		}
	})

	return wss
}

module.exports = setupWebSocket
