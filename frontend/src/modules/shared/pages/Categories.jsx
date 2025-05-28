import React, { useEffect, useState } from 'react'
import rootStyles from '../../../styles/shared/layout/root.module.css'
import Footer from '../../user/components/UserExpirience/Footer'
import NavBar from '../../user/components/UserExpirience/NavBar'
import BurgerMenu from '../components/BurgerMenu'

const Categories = () => {
	const [categories, setCategories] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

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

	if (loading) return <div className='text-center py-8'>Завантаження...</div>
	if (error) return <div className='text-center text-red-500 py-8'>{error}</div>

	return (
		<div className={rootStyles.wrapper}>
			<NavBar />
			<div className={rootStyles.Container}>
				<BurgerMenu />
				<main className={rootStyles.Main}>
					<div className='max-w-3xl mx-auto py-10 px-4'>
						<h1 className='text-3xl font-bold mb-8 text-center'>Категорії</h1>
						<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
							{categories.length === 0 ? (
								<div className='col-span-full text-center text-gray-400'>
									Категорій не знайдено
								</div>
							) : (
								categories.map((cat, idx) => (
									<div
										key={idx}
										className='bg-white rounded-xl shadow p-6 flex items-center justify-center text-lg font-semibold hover:bg-yellow-50 transition'
									>
										{cat}
									</div>
								))
							)}
						</div>
					</div>
				</main>
			</div>
			<Footer />
		</div>
	)
}

export default Categories
