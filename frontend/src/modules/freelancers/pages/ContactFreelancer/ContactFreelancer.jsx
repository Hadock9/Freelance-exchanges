import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../../context/AuthContext'
import { validateTextArea } from '../../../../js/FormValidation'
import styles from '../../../../styles/shared/layout/root.module.css'
import BurgerMenu from '../../../shared/components/BurgerMenu'
import Footer from '../../../user/components/UserExpirience/Footer'
import NavBar from '../../../user/components/UserExpirience/NavBar'

const ContactFreelancer = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const { user, isRegUser } = useContext(AuthContext)
	const freelancer = location.state?.freelancer

	const [message, setMessage] = useState('')
	const [messageDirty, setMessageDirty] = useState(false)
	const [messageError, setMessageError] = useState(
		'Повідомлення не може бути пустим'
	)
	const [isSubmitting, setIsSubmitting] = useState(false)

	if (!freelancer) {
		return (
			<div className='container mx-auto px-4 py-8'>
				<h2 className='text-2xl font-bold text-gray-800 mb-4'>
					Фрілансера не знайдено
				</h2>
				<button
					onClick={() => navigate('/search-freelancers')}
					className='bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300'
				>
					Повернутися до пошуку
				</button>
			</div>
		)
	}

	const handleMessageChange = e => {
		setMessage(e.target.value)
		setMessageError(validateTextArea(e.target.value))
	}

	const handleSubmit = async e => {
		e.preventDefault()
		if (!isRegUser) {
			toast.error('Будь ласка, увійдіть в систему щоб відправити повідомлення')
			return
		}

		if (messageError || !message.trim()) {
			setMessageDirty(true)
			return
		}

		setIsSubmitting(true)

		try {
			// TODO: Implement API call to send message
			toast.success('Повідомлення успішно відправлено')
			navigate('/search-freelancers')
		} catch (error) {
			console.error('Error sending message:', error)
			toast.error('Помилка при відправці повідомлення')
		} finally {
			setIsSubmitting(false)
		}
	}

	const renderStars = rating => {
		const stars = []
		const fullStars = Math.floor(rating)
		const hasHalfStar = rating % 1 >= 0.5

		for (let i = 0; i < fullStars; i++) {
			stars.push(
				<Star
					key={`star-${i}`}
					className='h-5 w-5 text-yellow-400 fill-yellow-400'
				/>
			)
		}

		if (hasHalfStar) {
			stars.push(
				<Star
					key='half-star'
					className='h-5 w-5 text-yellow-400 fill-yellow-400'
				/>
			)
		}

		const emptyStars = 5 - stars.length
		for (let i = 0; i < emptyStars; i++) {
			stars.push(
				<Star key={`empty-star-${i}`} className='h-5 w-5 text-gray-300' />
			)
		}

		return stars
	}

	return (
		<div className={styles.wrapper}>
			<NavBar />
			<div className={styles.Container}>
				<BurgerMenu />
				<main className={styles.Main}>
					<div className='container mx-auto px-4 py-8 max-w-4xl'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className='bg-white rounded-xl shadow-lg overflow-hidden'
						>
							<div className='p-6'>
								<div className='flex flex-col md:flex-row gap-6 mb-8'>
									<div className='flex-shrink-0'>
										<img
											src={freelancer.avatar}
											alt={freelancer.name}
											className='w-24 h-24 rounded-full border border-gray-200'
										/>
									</div>
									<div className='flex-grow'>
										<h2 className='text-2xl font-semibold text-gray-800 mb-2'>
											{freelancer.name}
										</h2>
										<p className='text-gray-600 mb-2'>{freelancer.title}</p>

										<div className='flex items-center mb-2'>
											<div className='flex mr-2'>
												{renderStars(freelancer.rating)}
											</div>
											<span className='text-sm text-gray-500'>
												({freelancer.rating})
											</span>
										</div>

										<div className='flex items-center text-gray-600 mb-2'>
											<FaMapMarkerAlt className='mr-2 text-gray-400' />
											<span>{freelancer.location}</span>
										</div>

										<div className='flex items-center text-gray-600 mb-2'>
											<FaBriefcase className='mr-2 text-gray-400' />
											<span>
												{freelancer.completedProjects} виконаних проектів
											</span>
										</div>

										<div className='flex flex-wrap gap-2 mt-3'>
											{freelancer.skills.map(skill => (
												<span
													key={skill}
													className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm'
												>
													{skill}
												</span>
											))}
										</div>
									</div>

									<div className='text-right'>
										<p className='text-xl font-semibold text-yellow-500'>
											${freelancer.hourlyRate}/год
										</p>
									</div>
								</div>

								<div className='border-t border-gray-200 pt-6'>
									<h3 className='text-xl font-semibold text-gray-800 mb-4'>
										Надіслати повідомлення
									</h3>

									{!isRegUser && (
										<div className='bg-red-50 border-l-4 border-red-500 p-4 mb-4'>
											<p className='text-red-700'>
												Ви не зареєстровані. Відправляти повідомлення можуть
												тільки зареєстровані користувачі.
											</p>
										</div>
									)}

									<form onSubmit={handleSubmit}>
										<div className='mb-4'>
											<label className='block text-sm font-medium text-gray-700 mb-2'>
												Ваше повідомлення
											</label>
											{messageDirty && messageError && (
												<p className='text-red-500 text-sm mb-2'>
													{messageError}
												</p>
											)}
											<textarea
												value={message}
												onChange={handleMessageChange}
												onBlur={() => setMessageDirty(true)}
												rows='4'
												className={`w-full px-4 py-3 border ${
													messageDirty && messageError
														? 'border-red-500'
														: 'border-gray-300'
												} rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent`}
												placeholder='Опишіть ваш проект та вимоги...'
											/>
										</div>

										<div className='flex justify-between items-center'>
											<button
												type='button'
												onClick={() => navigate('/search-freelancers')}
												className='px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-300'
											>
												Назад
											</button>
											<button
												type='submit'
												disabled={
													!isRegUser || isSubmitting || Boolean(messageError)
												}
												className={`px-6 py-2 bg-yellow-500 text-white rounded-lg transition duration-300 ${
													!isRegUser || isSubmitting || Boolean(messageError)
														? 'opacity-50 cursor-not-allowed'
														: 'hover:bg-yellow-600'
												}`}
											>
												{isSubmitting
													? 'Відправка...'
													: 'Відправити повідомлення'}
											</button>
										</div>
									</form>

									<div className='mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded'>
										<h4 className='text-lg font-semibold text-blue-700 mb-2'>
											Поради для успішної комунікації
										</h4>
										<ul className='list-disc list-inside text-blue-600 space-y-2'>
											<li>Чітко опишіть ваш проект та вимоги</li>
											<li>Вкажіть очікувані терміни виконання</li>
											<li>Зазначте ваш бюджет</li>
											<li>Опишіть бажаний формат співпраці</li>
										</ul>
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				</main>
			</div>
			<Footer />
		</div>
	)
}

export default ContactFreelancer
