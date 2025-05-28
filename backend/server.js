require('dotenv').config()
const app = require('./app')
const http = require('http')
const WebSocket = require('ws')
const jwt = require('jsonwebtoken')

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

// WebSocket connection handling
wss.on('connection', (ws, req) => {
	// Extract token from URL
	const token = new URL(req.url, 'ws://localhost').searchParams.get('token')

	if (!token) {
		ws.close()
		return
	}

	try {
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET || 'your-secret-key'
		)
		ws.userId = decoded.id
	} catch (error) {
		console.error('WebSocket authentication error:', error)
		ws.close()
		return
	}

	ws.on('message', async message => {
		try {
			const data = JSON.parse(message)

			// Broadcast message to all clients in the same chat room
			wss.clients.forEach(client => {
				if (
					client !== ws &&
					client.readyState === WebSocket.OPEN &&
					client.userId // Ensure client is authenticated
				) {
					client.send(
						JSON.stringify({
							...data,
							timestamp: new Date().toISOString(),
						})
					)
				}
			})
		} catch (error) {
			console.error('WebSocket message error:', error)
		}
	})
})

const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
