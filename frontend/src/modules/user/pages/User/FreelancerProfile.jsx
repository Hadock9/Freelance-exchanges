import React, { useEffect, useState } from 'react'
import { FaBriefcase, FaMapMarkerAlt, FaStar } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext'
import styles from '../../../../styles/shared/layout/root.module.css'
import Comments from '../../../freelancers/components/Comments/Comments'
import Reviews from '../../../freelancers/components/Reviews'
import BurgerMenu from '../../../shared/components/BurgerMenu'
import Loader from '../../../shared/components/Disclaimer/Loader'
import Footer from '../../../user/components/UserExpirience/Footer'
import NavBar from '../../../user/components/UserExpirience/NavBar'

const FreelancerProfile = () => {
	const { id } = useParams()
	const { user } = useAuth()
	const [freelancer, setFreelancer] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [skillsByCategory, setSkillsByCategory] = useState({})
	const [allSkills, setAllSkills] = useState([])

	useEffect(() => {
		const fetchFreelancer = async () => {
			try {
				setLoading(true)
				const response = await fetch(
					`http://localhost:4000/api/freelancers/${id}`
				)
				if (!response.ok) throw new Error('Не вдалося завантажити профіль')
				const data = await response.json()
				setFreelancer(data)
			} catch (err) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}
		fetchFreelancer()
	}, [id])

	useEffect(() => {
		const fetchAllSkills = async () => {
			const res = await fetch('http://localhost:4000/api/skills')
			const data = await res.json()
			setAllSkills(data)
		}
		fetchAllSkills()
	}, [])

	useEffect(() => {
		if (freelancer && freelancer.skills && allSkills.length) {
			const byCategory = {}
			freelancer.skills.forEach(skillName => {
				const skillObj = allSkills.find(s => s.name === skillName)
				if (skillObj) {
					if (!byCategory[skillObj.category]) byCategory[skillObj.category] = []
					byCategory[skillObj.category].push(skillObj.name)
				}
			})
			setSkillsByCategory(byCategory)
		}
	}, [freelancer, allSkills])

	if (loading) return <Loader />
	if (error) return <div className='text-center text-red-500 py-8'>{error}</div>
	if (!freelancer) return <div>Фрілансера не знайдено</div>

	const renderStars = rating => {
		const stars = []
		const fullStars = Math.floor(rating)
		const hasHalfStar = rating % 1 >= 0.5
		for (let i = 0; i < fullStars; i++) {
			stars.push(
				<FaStar key={`star-${i}`} className='h-5 w-5 text-yellow-400' />
			)
		}
		if (hasHalfStar) {
			stars.push(<FaStar key='half-star' className='h-5 w-5 text-yellow-400' />)
		}
		const emptyStars = 5 - stars.length
		for (let i = 0; i < emptyStars; i++) {
			stars.push(
				<FaStar key={`empty-star-${i}`} className='h-5 w-5 text-gray-300' />
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
						<div className='bg-white rounded-xl shadow-lg overflow-hidden mb-8'>
							<div className='p-6 flex flex-col md:flex-row gap-6'>
								<div className='flex-shrink-0'>
									<img
										src={freelancer.avatar || 'https://via.placeholder.com/150'}
										alt={freelancer.name}
										className='w-32 h-32 rounded-full border border-gray-200'
									/>
								</div>
								<div className='flex-grow'>
									<h1 className='text-3xl font-bold text-gray-800 mb-2'>
										{freelancer.name}
									</h1>
									<p className='text-xl text-gray-600 mb-2'>
										{freelancer.title || 'Фрілансер'}
									</p>
									<div className='flex items-center mb-2'>
										<div className='flex mr-2'>
											{renderStars(freelancer.rating || 0)}
										</div>
										<span className='text-sm text-gray-500'>
											({freelancer.rating || 0})
										</span>
									</div>
									<div className='flex items-center text-gray-600 mb-2'>
										<FaMapMarkerAlt className='mr-2 text-gray-400' />
										<span>{freelancer.location || 'Не вказано'}</span>
									</div>
									<div className='flex items-center text-gray-600 mb-2'>
										<FaBriefcase className='mr-2 text-gray-400' />
										<span>
											{freelancer.completed_projects || 0} виконаних проектів
										</span>
									</div>
									<p className='text-gray-600 mt-4'>
										{freelancer.description || 'Опис відсутній'}
									</p>
									<div className='flex flex-wrap gap-2 mt-4'>
										{Object.keys(skillsByCategory).length > 0 ? (
											Object.entries(skillsByCategory).map(([cat, skills]) => (
												<div key={cat} className='mb-2'>
													<div className='font-semibold text-gray-700 text-sm mb-1'>
														{cat}
													</div>
													<div className='flex flex-wrap gap-2'>
														{skills.map(skill => (
															<span
																key={skill}
																className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm'
															>
																{skill}
															</span>
														))}
													</div>
												</div>
											))
										) : (
											<span className='text-gray-500'>Навички не вказані</span>
										)}
									</div>
								</div>
							</div>
						</div>
						{/* Відгуки */}
						<Reviews freelancerId={freelancer.id} />
						{/* Коментарі */}
						<div className='bg-white rounded-xl shadow-lg overflow-hidden p-6 mt-8'>
							<h2 className='text-2xl font-bold mb-4'>Коментарі</h2>
							<Comments
								id={freelancer.id}
								urlFetch={`http://localhost:4000/api/comments/freelancer_comments/${
									freelancer.id
								}/${user?.id || 0}`}
								urlPost={`http://localhost:4000/api/comments/freelancer_comments/comment`}
								what_id={freelancer.id}
							/>
						</div>
					</div>
				</main>
			</div>
			<Footer />
		</div>
	)
}

export default FreelancerProfile
