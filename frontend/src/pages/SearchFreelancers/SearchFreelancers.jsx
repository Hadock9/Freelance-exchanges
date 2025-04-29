import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import React, { useState } from 'react'
import { FaBriefcase, FaMapMarkerAlt, FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import BurgerMenu from '../../components/BurgerMenu'
import Footer from '../../components/UserExpirience/Footer'
import NavBar from '../../components/UserExpirience/NavBar'
import rootstyle from '../../styles/root.module.css'

// Моковані дані для прикладу
const mockFreelancers = [
	{
		id: 1,
		name: 'Олександр Петренко',
		title: 'Full Stack Developer',
		rating: 4.8,
		hourlyRate: 35,
		location: 'Київ, Україна',
		skills: ['React', 'Node.js', 'MongoDB'],
		completedProjects: 45,
		avatar: 'https://i.pravatar.cc/150?img=1',
		description:
			'Розробник з 5-річним досвідом створення веб-додатків. Спеціалізуюсь на MERN stack.',
	},
	{
		id: 2,
		name: 'Марія Коваленко',
		title: 'UI/UX Designer',
		rating: 4.9,
		hourlyRate: 40,
		location: 'Львів, Україна',
		skills: ['Figma', 'Adobe XD', 'Sketch'],
		completedProjects: 38,
		avatar: 'https://i.pravatar.cc/150?img=2',
		description:
			'Дизайнер з креативним підходом та увагою до деталей. Створюю інтуїтивні інтерфейси.',
	},
	// Додайте більше фрілансерів за потреби
]

export default function SearchFreelancers() {
	const navigate = useNavigate()
	const [searchTerm, setSearchTerm] = useState('')
	const [sortBy, setSortBy] = useState('rating')
	const [priceRange, setPriceRange] = useState('all')
	const [category, setCategory] = useState('all')
	const [page, setPage] = useState(1)

	const handleSearch = event => {
		event.preventDefault()
		// TODO: Implement search logic
		console.log('Searching for:', searchTerm)
	}

	const handleSortChange = event => {
		setSortBy(event.target.value)
	}

	const handlePriceRangeChange = event => {
		setPriceRange(event.target.value)
	}

	const handleCategoryChange = event => {
		setCategory(event.target.value)
	}

	const handlePageChange = newPage => {
		setPage(newPage)
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
								</select>
							</div>
						</div>

						{/* Список фрілансерів */}
						<div className='space-y-6'>
							{mockFreelancers.map(freelancer => (
								<motion.div
									key={freelancer.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5 }}
									className='bg-white rounded-xl shadow-md overflow-hidden'
								>
									<div className='p-6'>
										<div className='flex flex-col md:flex-row gap-6'>
											<div className='flex-shrink-0'>
												<img
													src={freelancer.avatar}
													alt={freelancer.name}
													className='w-24 h-24 rounded-full border border-gray-200'
												/>
											</div>
											<div className='flex-grow'>
												<h2 className='text-xl font-semibold text-gray-800'>
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

												<p className='text-gray-600'>
													{freelancer.description}
												</p>
											</div>

											<div className='flex flex-col items-end justify-between'>
												<div className='text-right'>
													<p className='text-xl font-semibold text-yellow-500'>
														${freelancer.hourlyRate}/год
													</p>

													<div className='flex flex-wrap justify-end gap-1 mt-2'>
														{freelancer.skills.map(skill => (
															<span
																key={skill}
																className='px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full'
															>
																{skill}
															</span>
														))}
													</div>
												</div>

												<button
													onClick={() => handleContact(freelancer)}
													className='mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300'
												>
													Зв'язатися
												</button>
											</div>
										</div>
									</div>
								</motion.div>
							))}
						</div>

						{/* Пагінація */}
						<div className='flex justify-center mt-8 mb-4'>
							<div className='flex space-x-1'>
								{[1, 2, 3, 4, 5].map(pageNum => (
									<button
										key={pageNum}
										onClick={() => handlePageChange(pageNum)}
										className={`w-10 h-10 rounded-full flex items-center justify-center ${
											page === pageNum
												? 'bg-yellow-500 text-white'
												: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
										}`}
									>
										{pageNum}
									</button>
								))}
							</div>
						</div>
					</div>
				</main>
			</div>
			<Footer />
		</div>
	)
}
