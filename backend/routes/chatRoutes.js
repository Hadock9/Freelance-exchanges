const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chatController')
const auth = require('../middleware/auth')

// Create a new chat room
router.post('/rooms', auth, chatController.createChatRoom)

// Add participant to chat room
router.post('/participants', auth, chatController.addParticipant)

// Get chat participants
router.get('/participants/:chat_room_id', auth, chatController.getParticipants)

// Send a message
router.post('/messages', auth, chatController.sendMessage)

// Get chat messages
router.get('/messages/:chat_room_id', auth, chatController.getMessages)

// Get user's chat rooms
router.get('/user/:user_id', auth, chatController.getUserChats)

// Mark messages as read
router.post('/read', auth, chatController.markAsRead)

module.exports = router
