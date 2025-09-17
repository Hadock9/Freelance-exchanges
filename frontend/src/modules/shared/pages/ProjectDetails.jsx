import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import rootStyles from '../../../styles/shared/layout/root.module.css'
import Footer from '../../user/components/UserExpirience/Footer'
import NavBar from '../../user/components/UserExpirience/NavBar'
import BurgerMenu from '../components/BurgerMenu'

const ProjectDetails = () => {
	const { id } = useParams()
	const [project, setProject] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [reviews, setReviews] = useState([])

	useEffect(() => {
		const fetchProjectDetails = async () => {
			try {
				const res = await fetch(`http://localhost:4000/api/projects/${id}`)
				if (!res.ok) throw new Error('Помилка завантаження проекту')
				const data = await res.json()
				setProject(data)
				// Тимчасові дані для відгуків
				setReviews([
					{
						id: 1,
						user: 'perryrose',
						country: 'United States',
						rating: 5,
						comment:
							'I had to go through roughly 75 freelancers before I met this seller. I wanted a simple custom website and a custom order form using Stripe and Paypal. The work was exceptional!',
						date: '6 days ago',
					},
					{
						id: 2,
						user: 'maccrossman',
						country: 'Canada',
						rating: 5,
						comment:
							'I am very happy with the work. The delivery, communication throughout, and professionalism are much appreciated. I will be recommending this service!',
						date: '5 days ago',
					},
					{
						id: 3,
						user: 'reggieil',
						country: 'United Kingdom',
						rating: 5,
						comment:
							'Truly impressed with the website development skills! The work was PROFESSIONAL and bug-free, exceeding expectations in every way.',
						date: '1 week ago',
					},
				])
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}
		fetchProjectDetails()
	}, [id])

	if (loading) return <div className='text-center py-8'>Завантаження...</div>
	if (error) return <div className='text-center text-red-500 py-8'>{error}</div>
	if (!project)
		return <div className='text-center py-8'>Проект не знайдено</div>

	return (
		<div className={rootStyles.wrapper}>
			<NavBar />
			<div className={rootStyles.Container}>
				<BurgerMenu />
				<main className={rootStyles.Main}>
					<div className='max-w-7xl mx-auto px-4 py-8'>
						<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
							{/* Ліва колонка - основна інформація */}
							<div className='lg:col-span-2'>
								<h1 className='text-3xl font-bold mb-4'>{project.title}</h1>

								{/* Галерея зображень */}
								<div className='relative rounded-xl overflow-hidden mb-6'>
									<img
										src={
											project.image ||
											`https://source.unsplash.com/1200x600/?project,portfolio,design,code,random&sig=${id}`
										}
										alt={project.title}
										className='w-full h-[400px] object-cover'
									/>
								</div>

								{/* Інформація про продавця */}
								<div className='flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl'>
									<img
										src={
											project.owner_avatar ||
											'https://randomuser.me/api/portraits/men/32.jpg'
										}
										alt='owner avatar'
										className='w-16 h-16 rounded-full border-2 border-white shadow'
									/>
									<div className='flex-1'>
										<h3 className='font-semibold text-lg'>
											{project.owner_name || 'User Name'}
										</h3>
										<div className='flex items-center gap-2 text-sm text-gray-600'>
											<span className='flex items-center text-yellow-500'>
												<svg
													className='w-4 h-4 mr-1'
													fill='currentColor'
													viewBox='0 0 20 20'
												>
													<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.388-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z' />
												</svg>
												{project.rating ? project.rating.toFixed(1) : '4.9'}
											</span>
											<span>•</span>
											<span>Level 2 Seller</span>
											<span>•</span>
											<span>7 orders in queue</span>
										</div>
									</div>
									<button className='bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded-lg transition'>
										Contact Me
									</button>
								</div>

								{/* Опис проекту */}
								<div className='prose max-w-none mb-8'>
									<h2 className='text-2xl font-bold mb-4'>
										About This Project
									</h2>
									<p className='text-gray-600 mb-4'>{project.description}</p>

									<h3 className='text-xl font-bold mb-3'>What I Offer:</h3>
									<ul className='list-disc list-inside space-y-2 mb-6'>
										<li>Custom WordPress website using Elementor Pro</li>
										<li>
											Fully responsive design (mobile, tablet, and desktop)
										</li>
										<li>High-speed optimization for fast loading times</li>
										<li>SEO-friendly structure for better rankings</li>
										<li>Integration of essential plugins for functionality</li>
										<li>Contact forms, social media links, and CTA buttons</li>
										<li>E-commerce functionality (if needed)</li>
										<li>Easy-to-use admin panel for future updates</li>
									</ul>

									<h3 className='text-xl font-bold mb-3'>Why Choose Me?</h3>
									<ul className='list-disc list-inside space-y-2 mb-6'>
										<li>100% Client Satisfaction Guaranteed</li>
										<li>Quick Turnaround Time</li>
										<li>Unlimited Revisions Until you are Happy</li>
										<li>Dedicated Support Even After Delivery</li>
										<li>Affordable Pricing for High-Quality Work</li>
									</ul>
								</div>

								{/* Навички */}
								{project.skills && (
									<div className='mb-8'>
										<h2 className='text-2xl font-bold mb-4'>Skills Required</h2>
										<div className='flex flex-wrap gap-2'>
											{project.skills.split(',').map((skill, index) => (
												<span
													key={index}
													className='bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm'
												>
													{skill.trim()}
												</span>
											))}
										</div>
									</div>
								)}

								{/* Відгуки */}
								<div className='mb-8'>
									<h2 className='text-2xl font-bold mb-4'>
										What people loved about this freelancer
									</h2>
									<div className='space-y-6'>
										{reviews.map(review => (
											<div
												key={review.id}
												className='border-b border-gray-200 pb-6'
											>
												<div className='flex items-center gap-3 mb-2'>
													<span className='font-semibold'>{review.user}</span>
													<span className='text-gray-500'>
														{review.country}
													</span>
													<span className='flex items-center text-yellow-500'>
														<svg
															className='w-4 h-4 mr-1'
															fill='currentColor'
															viewBox='0 0 20 20'
														>
															<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118l-3.388-2.46c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.967z' />
														</svg>
														{review.rating}
													</span>
													<span className='text-gray-500 text-sm'>
														{review.date}
													</span>
												</div>
												<p className='text-gray-600'>{review.comment}</p>
											</div>
										))}
									</div>
								</div>

								{/* FAQ */}
								<div className='mb-8'>
									<h2 className='text-2xl font-bold mb-4'>FAQ</h2>
									<div className='space-y-4'>
										<div>
											<h3 className='font-semibold mb-2'>
												What do you need to get started?
											</h3>
											<p className='text-gray-600'>
												I need your domain & hosting details, logo, content, and
												design preferences.
											</p>
										</div>
										<div>
											<h3 className='font-semibold mb-2'>
												Will my website be mobile-friendly?
											</h3>
											<p className='text-gray-600'>
												Yes! It will be fully responsive on all devices.
											</p>
										</div>
										<div>
											<h3 className='font-semibold mb-2'>
												Can I edit my website later?
											</h3>
											<p className='text-gray-600'>
												Yes! Elementor Pro makes it easy to edit, and I'll guide
												you.
											</p>
										</div>
										<div>
											<h3 className='font-semibold mb-2'>
												Do you offer SEO optimization?
											</h3>
											<p className='text-gray-600'>
												Yes! Your site will be SEO-friendly for better rankings.
											</p>
										</div>
									</div>
								</div>
							</div>

							{/* Права колонка - замовлення */}
							<div className='lg:col-span-1'>
								<div className='sticky top-24 bg-white rounded-xl shadow-lg p-6 border border-gray-100'>
									<div className='mb-6'>
										<h2 className='text-2xl font-bold mb-2'>
											${project.budget}
										</h2>
										<p className='text-gray-500'>Starting price</p>
									</div>

									<div className='space-y-4 mb-6'>
										<div className='flex items-center gap-3'>
											<svg
												className='w-5 h-5 text-green-500'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													d='M5 13l4 4L19 7'
												/>
											</svg>
											<span>High quality work</span>
										</div>
										<div className='flex items-center gap-3'>
											<svg
												className='w-5 h-5 text-green-500'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													d='M5 13l4 4L19 7'
												/>
											</svg>
											<span>Fast delivery</span>
										</div>
										<div className='flex items-center gap-3'>
											<svg
												className='w-5 h-5 text-green-500'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													d='M5 13l4 4L19 7'
												/>
											</svg>
											<span>Unlimited revisions</span>
										</div>
									</div>

									<button className='w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-4 px-6 rounded-lg transition shadow-sm text-lg'>
										Order Now
									</button>

									<div className='mt-4 text-center'>
										<button className='text-gray-500 hover:text-gray-700 flex items-center justify-center gap-2 mx-auto'>
											<svg
												className='w-5 h-5'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													d='M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z'
												/>
											</svg>
											Save to Wishlist
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
			<Footer />
		</div>
	)
}

export default ProjectDetails
