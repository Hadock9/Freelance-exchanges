import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../../../context/AuthContext'

const Chat = ({ id: chatRoomId }) => {
	const { user } = useAuth()
	const [messages, setMessages] = useState([])
	const [newMessage, setNewMessage] = useState('')
	const [ws, setWs] = useState(null)
	const [participants, setParticipants] = useState([])
	const messagesEndRef = useRef(null)
	const token = localStorage.getItem('token')

	useEffect(() => {
		if (!token) {
			toast.error('Будь ласка, увійдіть в систему')
			return
		}

		// Підключаємось до WebSocket
		const wsClient = new WebSocket(`ws://localhost:4000/ws?token=${token}`)

		wsClient.onopen = () => {
			console.log('WebSocket підключено')
		}

		wsClient.onmessage = event => {
			const data = JSON.parse(event.data)
			if (data.type === 'message' && data.chatRoomId === chatRoomId) {
				// Оновлюємо повідомлення при отриманні нового
				loadMessages()
			}
		}

		wsClient.onerror = error => {
			console.error('WebSocket помилка:', error)
			toast.error('Помилка підключення до чату')
		}

		setWs(wsClient)

		// Завантажуємо історію повідомлень та учасників
		loadMessages()
		loadParticipants()

		return () => {
			wsClient.close()
		}
	}, [chatRoomId, user.id])

	const loadMessages = async () => {
		try {
			const response = await axios.get(
				`http://localhost:4000/api/chat/messages/${chatRoomId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			const formattedMessages = response.data.map(msg => ({
				id: msg.id,
				text: msg.message,
				sender: msg.sender_id === user.id ? 'user' : 'other',
				timestamp: new Date(msg.created_at).toLocaleTimeString(),
				senderName: msg.first_name,
				senderAvatar: msg.picture,
			}))
			setMessages(formattedMessages)
		} catch (error) {
			console.error('Error loading messages:', error)
			toast.error('Помилка завантаження повідомлень')
		}
	}

	const loadParticipants = async () => {
		try {
			const response = await axios.get(
				`http://localhost:4000/api/chat/participants/${chatRoomId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			setParticipants(response.data)
		} catch (error) {
			console.error('Error loading participants:', error)
			toast.error('Помилка завантаження учасників')
		}
	}

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	const sendMessage = async e => {
		e.preventDefault()
		if (!newMessage.trim()) return

		try {
			// Перевіряємо, чи не є користувач єдиним учасником чату
			if (participants.length === 1 && participants[0].id === user.id) {
				toast.error('Ви не можете написати самі собі')
				return
			}

			// Відправляємо повідомлення на сервер
			const response = await axios.post(
				'http://localhost:4000/api/chat/messages',
				{
					chat_room_id: chatRoomId,
					message: newMessage,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			if (response.status === 200) {
				// Відправляємо повідомлення через WebSocket
				if (ws && ws.readyState === WebSocket.OPEN) {
					ws.send(
						JSON.stringify({
							type: 'message',
							chatRoomId: chatRoomId,
							message: newMessage,
							senderId: user.id,
						})
					)
					setNewMessage('')
					// Оновлюємо повідомлення після відправки
					loadMessages()
				} else {
					toast.error('Помилка відправки повідомлення')
				}
			}
		} catch (error) {
			console.error('Error sending message:', error)
			toast.error('Помилка відправки повідомлення')
		}
	}

	// Додаємо функцію для оновлення повідомлень після відправки
	const updateMessages = async () => {
		await loadMessages()
	}

	useEffect(() => {
		if (ws) {
			ws.onmessage = event => {
				const data = JSON.parse(event.data)
				if (data.type === 'message' && data.chatRoomId === chatRoomId) {
					updateMessages() // Оновлюємо повідомлення при отриманні нового
				}
			}
		}
	}, [ws, chatRoomId])

	return (
		<div className='flex flex-col h-full'>
			<div className='flex-1 overflow-y-auto p-4'>
				{messages.map(msg => (
					<div
						key={msg.id}
						className={`mb-4 ${
							msg.sender === 'user' ? 'text-right' : 'text-left'
						}`}
					>
						<div
							className={`inline-block p-2 rounded-lg ${
								msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
							}`}
						>
							{msg.text}
							<div className='text-xs mt-1'>{msg.timestamp}</div>
						</div>
					</div>
				))}
				<div ref={messagesEndRef} />
			</div>
			<form onSubmit={sendMessage} className='p-4 border-t'>
				<div className='flex gap-2'>
					<input
						type='text'
						value={newMessage}
						onChange={e => setNewMessage(e.target.value)}
						className='flex-1 p-2 border rounded'
						placeholder='Введіть повідомлення...'
					/>
					<button
						type='submit'
						className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
					>
						Надіслати
					</button>
				</div>
			</form>
		</div>
	)
}

export default Chat
