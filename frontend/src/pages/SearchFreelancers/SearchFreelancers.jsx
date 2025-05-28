import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { FaBriefcase, FaMapMarkerAlt, FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import BurgerMenu from '../../components/BurgerMenu'
import Footer from '../../components/UserExpirience/Footer'
import NavBar from '../../components/UserExpirience/NavBar'
import rootstyle from '../../styles/root.module.css'

export default function SearchFreelancers() {
	const navigate = useNavigate()
	const [searchTerm, setSearchTerm] = useState('')
	const [sortBy, setSortBy] = useState('rating')
	const [priceRange, setPriceRange] = useState('all')
	const [category, setCategory] = useState('all')
	const [page, setPage] = useState(1)
	const [freelancers, setFreelancers] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [pagination, setPagination] = useState({
		currentPage: 1,
		totalPages: 1,
		totalItems: 0,
		itemsPerPage: 10,
	})

	// Прибираю повторне оголошення page, limit, total
	const currentPage = pagination?.page || page
	const currentLimit = pagination?.limit || 10
	const totalCount = pagination?.total || 0

	// Функція для отримання фрілансерів з бекенду
	const fetchFreelancers = async () => {
		setLoading(true)
		setError(null)

		try {
			const params = new URLSearchParams({
				page,
				sortBy,
				limit: 10,
			})

			if (searchTerm) {
				params.append('search', searchTerm)
			}
			if (category !== 'all') {
				params.append('category', category)
			}
			if (priceRange !== 'all') {
				const [min, max] = priceRange.split('-')
				if (min) params.append('minPrice', min)
				if (max) params.append('maxPrice', max)
			}

			const response = await fetch(
				`http://localhost:4000/api/freelancers?${params.toString()}`
			)

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}

			const data = await response.json()
			setFreelancers(data.freelancers)
			setPagination(data.pagination)
		} catch (err) {
			console.error('Error fetching freelancers:', err)
			setError('Помилка при завантаженні фрілансерів')
		} finally {
			setLoading(false)
		}
	}

	// Викликаємо fetchFreelancers при зміні параметрів
	useEffect(() => {
		fetchFreelancers()
	}, [page, sortBy, category, priceRange])

	// Обробка пошуку з затримкою
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (searchTerm !== undefined) {
				setPage(1) // Скидаємо на першу сторінку при новому пошуку
				fetchFreelancers()
			}
		}, 500)

		return () => clearTimeout(delayDebounceFn)
	}, [searchTerm])

	const handleSearch = event => {
		event.preventDefault()
		fetchFreelancers()
	}

	const handleSortChange = event => {
		setSortBy(event.target.value)
		setPage(1)
	}

	const handlePriceRangeChange = event => {
		setPriceRange(event.target.value)
		setPage(1)
	}

	const handleCategoryChange = event => {
		setCategory(event.target.value)
		setPage(1)
	}

	const handlePageChange = newPage => {
		setPage(newPage)
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const handleContact = freelancer => {
		navigate('/contact-freelancer', { state: { freelancer } })
	}

	// Функція для відображення зірок рейтингу
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

		if (hasHalfStar && fullStars < 5) {
			stars.push(
				<Star
					key='half-star'
					className='h-5 w-5 text-yellow-400'
					style={{ fill: 'url(#half-fill)' }}
				/>
			)
		}

		const emptyStars = 5 - Math.ceil(rating)
		for (let i = 0; i < emptyStars; i++) {
			stars.push(
				<Star key={`empty-star-${i}`} className='h-5 w-5 text-gray-300' />
			)
		}

		return (
			<>
				<svg width='0' height='0'>
					<defs>
						<linearGradient id='half-fill'>
							<stop offset='50%' stopColor='#FBBF24' />
							<stop offset='50%' stopColor='#D1D5DB' />
						</linearGradient>
					</defs>
				</svg>
				{stars}
			</>
		)
	}

	// Функція для генерації масиву сторінок для пагінації
	const generatePageNumbers = () => {
		const pages = []
		const maxVisiblePages = 5
		const halfVisible = Math.floor(maxVisiblePages / 2)

		let startPage = Math.max(1, pagination.currentPage - halfVisible)
		let endPage = Math.min(
			pagination.totalPages,
			startPage + maxVisiblePages - 1
		)

		if (endPage - startPage < maxVisiblePages - 1) {
			startPage = Math.max(1, endPage - maxVisiblePages + 1)
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i)
		}

		return pages
	}

	return (
		<div className={rootstyle.wrapper}>
			<NavBar />

			<div className={rootstyle.Container}>
				<BurgerMenu />

				<main className={rootstyle.Main}>
					<div className='container mx-auto px-4 py-8 max-w-6xl'>
						{/* Пошуковий розділ */}
						<div className='mb-10'>
							<h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>
								Знайдіть найкращого фрілансера для вашого проекту
							</h1>

							<form onSubmit={handleSearch} className='max-w-3xl mx-auto'>
								<div className='relative'>
									<input
										type='text'
										placeholder='Пошук за навичками, спеціалізацією...'
										value={searchTerm}
										onChange={e => setSearchTerm(e.target.value)}
										className='w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent'
									/>
									<FaSearch className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
								</div>
							</form>
						</div>

						{/* Фільтри та сортування */}
						<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Сортувати за
								</label>
								<select
									value={sortBy}
									onChange={handleSortChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent'
								>
									<option value='rating'>Рейтингом</option>
									<option value='price_low'>Ціною (від низької)</option>
									<option value='price_high'>Ціною (від високої)</option>
									<option value='projects'>Кількістю проектів</option>
								</select>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Ціновий діапазон
								</label>
								<select
									value={priceRange}
									onChange={handlePriceRangeChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent'
								>
									<option value='all'>Всі ціни</option>
									<option value='0-20'>$0 - $20</option>
									<option value='20-50'>$20 - $50</option>
									<option value='50-100'>$50 - $100</option>
									<option value='100+'>$100+</option>
								</select>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Категорія
								</label>
								<select
									value={category}
									onChange={handleCategoryChange}
									className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent'
								>
									<option value='all'>Всі категорії</option>
									<option value='development'>Розробка</option>
									<option value='design'>Дизайн</option>
									<option value='marketing'>Маркетинг</option>
									<option value='writing'>Копірайтинг</option>
									<option value='other'>Інше</option>
								</select>
							</div>
						</div>

						{/* Список фрілансерів */}
						{loading ? (
							<div className='flex justify-center items-center h-64'>
								<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500'></div>
							</div>
						) : error ? (
							<div className='text-center text-red-500 py-8'>{error}</div>
						) : (
							freelancers.length > 0 && (
								<div className='flex flex-col gap-6 mt-6'>
									{freelancers.map(freelancer => (
										<motion.div
											key={freelancer.id}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.5 }}
											className='bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'
										>
											<div className='p-6'>
												<div className='flex flex-col md:flex-row gap-6'>
													<div className='flex-shrink-0'>
														<img
															src={freelancer.avatar || '/img/User-Default.svg'}
															alt={freelancer.name}
															className='w-24 h-24 rounded-full border border-gray-200 object-cover'
														/>
													</div>
													<div className='flex-grow'>
														<h2 className='text-xl font-semibold text-gray-800'>
															{freelancer.name}
														</h2>
														<p className='text-gray-600 mb-2'>
															{freelancer.title}
														</p>

														<div className='flex items-center mb-2'>
															<div className='flex mr-2'>
																{renderStars(freelancer.rating)}
															</div>
															<div className='flex items-center gap-1'>
																<Star className='w-4 h-4 text-yellow-400 fill-yellow-400' />
																<span className='text-sm font-medium'>
																	{Number(freelancer.rating).toFixed(1)}
																</span>
															</div>
															{freelancer.total_reviews > 0 && (
																<span className='text-sm text-gray-500 ml-2'>
																	{freelancer.total_reviews} відгуків
																</span>
															)}
														</div>

														<div className='flex items-center text-gray-600 mb-2'>
															<FaMapMarkerAlt className='mr-2 text-gray-400' />
															<span>{freelancer.location || 'Не вказано'}</span>
														</div>

														<div className='flex items-center text-gray-600 mb-2'>
															<FaBriefcase className='mr-2 text-gray-400' />
															<span>
																{freelancer.completed_projects} виконаних
																проектів
															</span>
														</div>

														<p className='text-gray-600'>
															{freelancer.description}
														</p>
													</div>

													<div className='flex flex-col items-end justify-between'>
														<div className='text-right'>
															<div className='text-lg font-semibold text-gray-900'>
																${Number(freelancer.hourly_rate).toFixed(2)}/год
															</div>

															<div className='flex flex-wrap justify-end gap-1 mt-2'>
																{freelancer.skills.map((skill, index) => (
																	<span
																		key={index}
																		className='px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full'
																	>
																		{skill}
																	</span>
																))}
															</div>
														</div>

														<button
															onClick={() =>
																navigate(`/chat/${freelancer.user_id}`)
															}
															className='w-[120px] bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors'
														>
															Зв'язатися
														</button>
													</div>
												</div>
											</div>
										</motion.div>
									))}
								</div>
							)
						)}

						{/* Пагінація */}
						{!loading && !error && pagination.totalPages > 1 && (
							<div className='flex justify-center mt-8 mb-4'>
								<div className='flex items-center space-x-1'>
									{/* Кнопка "Попередня" */}
									<button
										onClick={() => handlePageChange(pagination.currentPage - 1)}
										disabled={pagination.currentPage === 1}
										className={`px-3 py-2 rounded-lg ${
											pagination.currentPage === 1
												? 'bg-gray-100 text-gray-400 cursor-not-allowed'
												: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
										}`}
									>
										←
									</button>

									{/* Номери сторінок */}
									{generatePageNumbers().map(pageNum => (
										<button
											key={pageNum}
											onClick={() => handlePageChange(pageNum)}
											className={`w-10 h-10 rounded-full flex items-center justify-center ${
												pagination.currentPage === pageNum
													? 'bg-yellow-500 text-white'
													: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
											}`}
										>
											{pageNum}
										</button>
									))}

									{/* Кнопка "Наступна" */}
									<button
										onClick={() => handlePageChange(pagination.currentPage + 1)}
										disabled={pagination.currentPage === pagination.totalPages}
										className={`px-3 py-2 rounded-lg ${
											pagination.currentPage === pagination.totalPages
												? 'bg-gray-100 text-gray-400 cursor-not-allowed'
												: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
										}`}
									>
										→
									</button>
								</div>
							</div>
						)}

						{/* Відображення інформації про кількість фрілансерів */}
						{totalCount > 0 ? (
							<div className='text-center text-gray-500 text-sm mt-4'>
								Показано {(currentPage - 1) * currentLimit + 1} –{' '}
								{Math.min(currentPage * currentLimit, totalCount)} з{' '}
								{totalCount} фрілансерів
							</div>
						) : (
							<div className='text-center text-gray-500 text-sm mt-4'>
								Фрілансерів не знайдено
							</div>
						)}
					</div>
				</main>
			</div>
			<Footer />
		</div>
	)
}
