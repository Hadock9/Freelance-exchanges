import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext'
import styles from '../../../../styles/shared/layout/root.module.css'
import BurgerMenu from '../../../shared/components/BurgerMenu'
import Footer from '../../../user/components/UserExpirience/Footer'
import NavBar from '../../../user/components/UserExpirience/NavBar'
import Chat from '../Chat/Chat'

const Chats = () => {
	const { user } = useAuth()
	const navigate = useNavigate()
	const [chats, setChats] = useState([])
	const [loading, setLoading] = useState(true)
	const [selectedChatId, setSelectedChatId] = useState(null)

	useEffect(() => {
		if (!user || !user.id) {
			setLoading(false)
			return
		}
		const fetchChats = async () => {
			try {
				const token = localStorage.getItem('token')
				if (!token) {
					toast.error('Будь ласка, увійдіть в систему')
					return
				}
				const response = await fetch(
					`http://localhost:4000/api/chat/user/${user.id}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				)
				if (!response.ok) throw new Error('Не вдалося завантажити чати')
				const data = await response.json()
				setChats(data)
			} catch (error) {
				console.error('Error fetching chats:', error)
				toast.error('Помилка завантаження чатів')
			} finally {
				setLoading(false)
			}
		}
		fetchChats()
	}, [user])

	if (!user || !user.id) {
		return (
			<div className='flex justify-center items-center h-64'>
				<div className='text-gray-500'>Будь ласка, увійдіть в систему</div>
			</div>
		)
	}

	const handleChatClick = chatId => {
		navigate(`/chat/${chatId}`)
	}

	return (
		<div className={styles.wrapper}>
			<NavBar />
			<div className={styles.Container}>
				<BurgerMenu />
				<main className={styles.Main}>
					<div className='flex w-full max-w-5xl mx-auto h-[70vh] bg-white rounded-xl shadow overflow-hidden'>
						{/* Список чатів */}
						<div className='w-1/3 border-r overflow-y-auto'>
							<h1 className='text-2xl font-bold text-center text-gray-800 my-4'>
								Мої чати
							</h1>
							{loading ? (
								<div className='flex justify-center items-center h-64'>
									<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500'></div>
								</div>
							) : chats.filter(chat => chat.last_message).length > 0 ? (
								<div>
									{chats
										.filter(chat => chat.last_message)
										.map(chat => {
											const other = chat.participants?.find(
												p => p.id !== user.id
											)
											return (
												<div
													key={chat.id}
													onClick={() => setSelectedChatId(chat.id)}
													className={`flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-gray-50 transition group ${
														selectedChatId === chat.id ? 'bg-gray-100' : ''
													}`}
												>
													<img
														src={
															other?.picture
																? other.picture.startsWith('http')
																	? other.picture
																	: `http://localhost:4000${other.picture}`
																: '/default-avatar.png'
														}
														alt={other?.first_name || 'User'}
														className='w-12 h-12 rounded-full object-cover border border-gray-200 shadow-sm'
													/>
													<div className='flex-1 min-w-0'>
														<div className='flex items-center gap-2 mb-0.5'>
															<span className='font-semibold text-gray-900 truncate'>
																{other?.first_name || 'Користувач'}
															</span>
															<span
																className={`ml-2 w-2 h-2 rounded-full ${
																	other?.is_online
																		? 'bg-green-500'
																		: 'bg-gray-400'
																}`}
																title={other?.is_online ? 'Online' : 'Offline'}
															></span>
														</div>
														<div className='text-gray-600 text-sm truncate group-hover:text-gray-800'>
															{chat.last_message
																? chat.last_message
																: 'Немає повідомлень'}
														</div>
													</div>
													<div className='text-xs text-gray-400 whitespace-nowrap ml-2'>
														{chat.last_message_time
															? new Date(
																	chat.last_message_time
															  ).toLocaleTimeString([], {
																	hour: '2-digit',
																	minute: '2-digit',
															  })
															: ''}
													</div>
												</div>
											)
										})}
								</div>
							) : (
								<div className='text-center text-gray-500 py-8'>
									У вас поки немає чатів
								</div>
							)}
						</div>
						{/* Вміст чату */}
						<div className='flex-1 h-full'>
							{selectedChatId ? (
								<Chat id={selectedChatId} />
							) : (
								<div className='flex items-center justify-center h-full text-gray-400'>
									Виберіть чат зі списку
								</div>
							)}
						</div>
					</div>
				</main>
			</div>
			<Footer />
		</div>
	)
}

export default Chats
