import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'

const Reviews = ({ freelancerId }) => {
	const [reviews, setReviews] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [search, setSearch] = useState('')
	const [sort, setSort] = useState('newest')

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				setLoading(true)
				const res = await fetch(
					`http://localhost:4000/api/reviews/freelancer/${freelancerId}`
				)
				if (!res.ok) throw new Error('Не вдалося завантажити відгуки')
				const data = await res.json()
				console.log('Отримані відгуки:', data)
				setReviews(data)
			} catch (err) {
				console.error('Помилка при завантаженні відгуків:', err)
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}
		if (freelancerId) fetchReviews()
	}, [freelancerId])

	const filteredReviews = reviews
		.filter(
			r =>
				r.comment.toLowerCase().includes(search.toLowerCase()) ||
				(r.category && r.category.toLowerCase().includes(search.toLowerCase()))
		)
		.sort((a, b) => {
			if (sort === 'newest')
				return new Date(b.created_at) - new Date(a.created_at)
			if (sort === 'oldest')
				return new Date(a.created_at) - new Date(b.created_at)
			if (sort === 'rating') return b.rating - a.rating
			return 0
		})

	if (loading) return <div>Завантаження відгуків...</div>
	if (error) return <div className='text-red-500'>{error}</div>

	return (
		<div className='bg-white rounded-xl shadow-lg overflow-hidden p-6 mb-8'>
			<div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4'>
				<h2 className='text-2xl font-bold'>Відгуки</h2>
				<div className='flex gap-2'>
					<input
						type='text'
						placeholder='Пошук відгуків...'
						value={search}
						onChange={e => setSearch(e.target.value)}
						className='border rounded px-2 py-1 text-sm'
					/>
					<select
						value={sort}
						onChange={e => setSort(e.target.value)}
						className='border rounded px-2 py-1 text-sm'
					>
						<option value='newest'>Нові спочатку</option>
						<option value='oldest'>Старі спочатку</option>
						<option value='rating'>За рейтингом</option>
					</select>
				</div>
			</div>
			{filteredReviews.length === 0 ? (
				<div className='text-gray-500'>Відгуків поки немає</div>
			) : (
				<div className='grid gap-4'>
					{filteredReviews.map(r => (
						<div
							key={r.id}
							className='border rounded-lg p-4 flex flex-col md:flex-row gap-4 items-start'
						>
							<img
								src={r.user_avatar || 'https://via.placeholder.com/64'}
								alt='reviewer avatar'
								className='w-16 h-16 rounded-full border border-gray-200 object-cover'
							/>
							<div className='flex-grow'>
								<div className='flex items-center gap-2 mb-1'>
									<span className='font-semibold'>
										Користувач {r.client_id}
									</span>
									<span className='flex gap-1'>
										{[...Array(5)].map((_, i) => (
											<FaStar
												key={i}
												className={
													i < r.rating ? 'text-yellow-400' : 'text-gray-300'
												}
											/>
										))}
									</span>
									<span className='text-xs text-gray-400 ml-2'>
										{new Date(r.created_at).toLocaleDateString()}
									</span>
								</div>
								<div className='mb-2 text-gray-700'>{r.comment}</div>
								<div className='flex flex-wrap gap-2 text-sm text-gray-500'>
									{r.price_min && r.price_max && (
										<span>
											Ціна:{' '}
											<b>
												{r.price_min}₴ - {r.price_max}₴
											</b>
										</span>
									)}
									{r.duration_days && (
										<span>
											Тривалість: <b>{r.duration_days} днів</b>
										</span>
									)}
									{r.category && (
										<span className='bg-blue-100 text-blue-700 px-2 py-0.5 rounded'>
											{r.category}
										</span>
									)}
								</div>
								<div className='flex gap-2 mt-2 text-sm text-gray-500'>
									<span>
										Корисно: <b>{r.helpful_yes}</b>
									</span>
									<span>
										Не корисно: <b>{r.helpful_no}</b>
									</span>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default Reviews
