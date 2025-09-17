import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import rootStyles from '../../../styles/shared/layout/root.module.css'
import Footer from '../../user/components/UserExpirience/Footer'
import NavBar from '../../user/components/UserExpirience/NavBar'
import BurgerMenu from '../components/BurgerMenu'

const Categories = () => {
	const navigate = useNavigate()
	const [categories, setCategories] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [selectedCategory, setSelectedCategory] = useState(null)
	const [projects, setProjects] = useState([])
	const [projectsLoading, setProjectsLoading] = useState(false)
	const [projectsError, setProjectsError] = useState(null)
	const [selectedProject, setSelectedProject] = useState(null)

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await fetch('http://localhost:4000/api/skills/categories')
				if (!res.ok) throw new Error('Помилка завантаження категорій')
				const data = await res.json()
				console.log('Категорії з бекенду:', data)
				setCategories(data)
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}
		fetchCategories()
	}, [])

	const handleCategoryClick = async cat => {
		setSelectedCategory(cat)
		setProjects([])
		setProjectsLoading(true)
		setProjectsError(null)
		try {
			const res = await fetch(
				`http://localhost:4000/api/projects/category/${encodeURIComponent(cat)}`
			)
			if (!res.ok) throw new Error('Помилка завантаження проектів')
			const data = await res.json()
			setProjects(data)
		} catch (err) {
			setProjectsError(err.message)
		} finally {
			setProjectsLoading(false)
		}
	}

	if (loading) return <div className='text-center py-8'>Завантаження...</div>
	if (error) return <div className='text-center text-red-500 py-8'>{error}</div>

	return (
		<div className={rootStyles.wrapper}>
			<NavBar />
			<div className={rootStyles.Container}>
				<BurgerMenu />
				<main className={rootStyles.Main}>
					<div className='max-w-none w-full mx-auto py-6 px-0'>
						<h1 className='text-3xl font-bold mb-8 text-center'>Категорії</h1>
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8'>
							{categories.length === 0 ? (
								<div className='col-span-full text-center text-gray-400'>
									Категорій не знайдено
								</div>
							) : (
								categories.map((cat, idx) => (
									<button
										key={idx}
										className={`bg-white rounded-xl shadow p-6 flex items-center justify-center text-lg font-semibold hover:bg-yellow-50 transition border-2 ${
											selectedCategory === cat
												? 'border-yellow-400'
												: 'border-transparent'
										}`}
										onClick={() => handleCategoryClick(cat)}
									>
										{cat}
									</button>
								))
							)}
						</div>
						{selectedCategory && (
							<div>
								<h2 className='text-2xl font-bold mb-4 text-left'>
									Проекти категорії: {selectedCategory}
								</h2>
								{projectsLoading ? (
									<div className='text-center py-4'>Завантаження...</div>
								) : projectsError ? (
									<div className='text-center text-red-500 py-4'>
										{projectsError}
									</div>
								) : projects.length === 0 ? (
									<div className='text-center text-gray-400 py-4'>
										Проектів не знайдено
									</div>
								) : (
									<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
										{projects.map((project, idx) => (
											<div
												key={project.id}
												className='bg-white rounded-lg overflow-hidden flex flex-col h-full relative group transition-all duration-300 hover:shadow-xl border border-gray-100'
											>
												<div className='relative'>
													<img
														src={
															project.image ||
															`https://source.unsplash.com/800x400/?project,portfolio,design,code,random&sig=${idx}`
														}
														alt={project.title}
														className='w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300'
													/>
													<button
														className='absolute top-3 right-3 bg-white rounded-full p-2 shadow hover:bg-yellow-100 transition'
														onClick={() => setSelectedProject(project)}
													>
														<svg
															className='w-5 h-5 text-gray-400 hover:text-yellow-500'
															fill='none'
															stroke='currentColor'
															strokeWidth='2'
															viewBox='0 0 24 24'
														>
															<path
																strokeLinecap='round'
																strokeLinejoin='round'
																d='M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z'
															/>
														</svg>
													</button>
													{project.isTopRated && (
														<span className='absolute top-3 left-3 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-full shadow'>
															Top Rated
														</span>
													)}
												</div>
												<div className='p-5 flex-1 flex flex-col'>
													<div className='flex items-center gap-3 mb-3'>
														<img
															src={
																project.owner_avatar ||
																'https://randomuser.me/api/portraits/men/32.jpg'
															}
															alt='owner avatar'
															className='w-10 h-10 rounded-full border-2 border-white shadow'
														/>
														<div className='flex-1'>
															<span className='font-semibold text-gray-800 block'>
																{project.owner_name || 'User Name'}
															</span>
															<span className='text-sm text-gray-500'>
																Level 2 Seller
															</span>
														</div>
														<span className='flex items-center text-yellow-500 text-sm'>
															<svg
																className='w-4 h-4 mr-1'
																fill='currentColor'
																viewBox='0 0 20 20'
															>
																<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.388-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z' />
															</svg>
															{project.rating
																? project.rating.toFixed(1)
																: '4.9'}
														</span>
													</div>
													<h3 className='font-bold text-lg mb-2 line-clamp-2 hover:text-yellow-600 transition-colors'>
														{project.title}
													</h3>
													<div className='text-gray-500 text-sm mb-4 line-clamp-2'>
														{project.description}
													</div>
													<div className='mt-auto'>
														<div className='flex items-center justify-between mb-3'>
															<span className='text-gray-500 text-sm'>
																Starting at
															</span>
															<span className='font-bold text-lg text-gray-900'>
																${project.budget}
															</span>
														</div>
														<button
															className='w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 px-4 rounded-lg transition shadow-sm'
															onClick={() => navigate(`/project/${project.id}`)}
														>
															Order Now
														</button>
													</div>
												</div>
											</div>
										))}
									</div>
								)}
								{/* Модалка для деталей проекту */}
								{selectedProject && (
									<div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
										<div className='bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 relative'>
											<button
												className='absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl'
												onClick={() => setSelectedProject(null)}
												style={{ zIndex: 10 }}
											>
												&times;
											</button>
											<img
												src={
													selectedProject.image ||
													`https://source.unsplash.com/400x200/?project,portfolio,design,code,random&sig=modal`
												}
												alt={selectedProject.title}
												className='w-full h-48 object-cover rounded-xl mb-4'
											/>
											<div className='flex items-center gap-3 mb-4'>
												<img
													src={
														selectedProject.owner_avatar ||
														'https://randomuser.me/api/portraits/men/32.jpg'
													}
													alt='owner avatar'
													className='w-10 h-10 rounded-full border border-gray-200'
												/>
												<span className='font-semibold text-gray-800 truncate'>
													{selectedProject.owner_name || 'User Name'}
												</span>
												<span className='flex items-center text-yellow-500 text-sm ml-auto'>
													<svg
														className='w-4 h-4 mr-1'
														fill='currentColor'
														viewBox='0 0 20 20'
													>
														<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.388-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z' />
													</svg>
													{selectedProject.rating
														? selectedProject.rating.toFixed(1)
														: '4.9'}
												</span>
											</div>
											<h3 className='text-2xl font-bold mb-2'>
												{selectedProject.title}
											</h3>
											<div className='text-gray-600 mb-2'>
												{selectedProject.description}
											</div>
											<div className='mb-2'>
												<span className='font-semibold'>Бюджет:</span>{' '}
												{selectedProject.budget} ₴
											</div>
											<div className='mb-2'>
												<span className='font-semibold'>Дедлайн:</span>{' '}
												{selectedProject.deadline
													? new Date(
															selectedProject.deadline
													  ).toLocaleDateString()
													: '—'}
											</div>
											<div className='mb-2'>
												<span className='font-semibold'>Створено:</span>{' '}
												{new Date(selectedProject.created_at).toLocaleString()}
											</div>
											{selectedProject.skills && (
												<div className='mb-2'>
													<span className='font-semibold'>Навички:</span>{' '}
													{selectedProject.skills}
												</div>
											)}
											<button
												className='mt-6 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg transition w-full shadow-sm text-lg'
												onClick={() => setSelectedProject(null)}
											>
												Order Now
											</button>
										</div>
									</div>
								)}
							</div>
						)}
					</div>
				</main>
			</div>
			<Footer />
		</div>
	)
}

export default Categories
