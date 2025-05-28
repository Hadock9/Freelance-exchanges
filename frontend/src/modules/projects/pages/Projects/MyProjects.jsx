import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../../../context/AuthContext'
import styles from '../../../../styles/shared/layout/root.module.css'
import BurgerMenu from '../../../shared/components/BurgerMenu'
import Footer from '../../../user/components/UserExpirience/Footer'
import NavBar from '../../../user/components/UserExpirience/NavBar'

const placeholder =
	'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'

const getProjectImage = (project, idx) => {
	if (project.image) return project.image
	return `https://source.unsplash.com/600x400/?project,portfolio,design,code,random&sig=${idx}`
}

const MyProjects = () => {
	const { user } = useAuth()
	const [projects, setProjects] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!user || !user.id) {
			setLoading(false)
			return
		}
		const fetchProjects = async () => {
			try {
				const token = localStorage.getItem('token')
				if (!token) {
					toast.error('Будь ласка, увійдіть в систему')
					return
				}
				const response = await fetch(
					`http://localhost:4000/api/projects/user/${user.id}`,
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				)
				if (!response.ok) throw new Error('Не вдалося завантажити проекти')
				const data = await response.json()
				setProjects(data)
			} catch (error) {
				toast.error('Помилка завантаження проектів')
			} finally {
				setLoading(false)
			}
		}
		fetchProjects()
	}, [user])

	if (loading) {
		return (
			<div className={styles.wrapper}>
				<NavBar />
				<div className={styles.Container}>
					<BurgerMenu />
					<main className={styles.Main}>
						<div className='flex justify-center items-center h-64'>
							<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500'></div>
						</div>
					</main>
				</div>
				<Footer />
			</div>
		)
	}

	if (!projects.length) {
		return (
			<div className={styles.wrapper}>
				<NavBar />
				<div className={styles.Container}>
					<BurgerMenu />
					<main className={styles.Main}>
						<div className='text-center text-gray-500 py-8'>
							У вас поки немає проектів
						</div>
					</main>
				</div>
				<Footer />
			</div>
		)
	}

	// Головний проект (велика картка)
	const mainProject = projects[0]
	// Інші проекти (міні-превʼю)
	const otherProjects = projects.slice(1, 5)
	const moreCount = projects.length - 5

	return (
		<div className={styles.wrapper}>
			<NavBar />
			<div className={styles.Container}>
				<BurgerMenu />
				<main className={styles.Main}>
					<div className='container mx-auto px-4 py-8 max-w-4xl'>
						<h1 className='text-3xl font-bold text-center text-gray-800 mb-8'>
							My Portfolio
						</h1>
						{/* Головний проект */}
						<div className='flex flex-col md:flex-row bg-white rounded-2xl shadow-lg p-6 mb-8 gap-6'>
							<div className='flex-1 flex items-center justify-center'>
								<img
									src={getProjectImage(mainProject, 0)}
									alt={mainProject.title}
									className='rounded-xl object-cover w-full max-w-md h-64 shadow'
								/>
							</div>
							<div className='flex-1 flex flex-col justify-between'>
								<div>
									<div className='text-gray-500 mb-2'>
										From:{' '}
										{mainProject.deadline
											? new Date(mainProject.deadline).toLocaleString('en-US', {
													month: 'long',
													year: 'numeric',
											  })
											: '—'}
									</div>
									<h2 className='text-2xl font-bold mb-2'>
										{mainProject.title}
									</h2>
									<p className='text-gray-700 mb-4'>
										{mainProject.description}
									</p>
									<div className='flex flex-wrap gap-2 mb-4'>
										<span className='bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700'>
											{mainProject.category}
										</span>
										{mainProject.skills &&
											mainProject.skills
												.split(',')
												.slice(0, 5)
												.map(skill => (
													<span
														key={skill}
														className='bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700'
													>
														+{skill.trim()}
													</span>
												))}
									</div>
								</div>
								<div className='flex gap-8 mt-4'>
									<div>
										<div className='text-xs text-gray-500'>Project cost</div>
										<div className='font-bold text-lg text-gray-800'>
											{mainProject.budget ? `${mainProject.budget} ₴` : '—'}
										</div>
									</div>
									<div>
										<div className='text-xs text-gray-500'>
											Project duration
										</div>
										<div className='font-bold text-lg text-gray-800'>
											7-30 days
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* Інші проекти */}
						<div className='flex gap-4 mt-4'>
							{otherProjects.map((project, idx) => (
								<div
									key={project.id}
									className='w-40 h-32 rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer bg-white flex flex-col'
								>
									<img
										src={getProjectImage(project, idx + 1)}
										alt={project.title}
										className='object-cover w-full h-20'
									/>
									<div className='p-2 flex-1 flex flex-col justify-between'>
										<div className='font-semibold text-sm truncate'>
											{project.title}
										</div>
										<div className='text-xs text-gray-500 truncate'>
											{project.category}
										</div>
									</div>
								</div>
							))}
							{moreCount > 0 && (
								<div className='w-40 h-32 rounded-xl flex items-center justify-center bg-gray-100 text-gray-600 font-semibold text-lg'>
									+{moreCount} Projects
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

export default MyProjects
