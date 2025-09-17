import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../../context/AuthContext'
import rootStyles from '../../../../styles/shared/layout/root.module.css'
import BurgerMenu from '../../../shared/components/BurgerMenu'
import Footer from '../../components/UserExpirience/Footer'
import NavBar from '../../components/UserExpirience/NavBar'

const MyBids = () => {
	const { user } = useAuth()
	const [bids, setBids] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		if (!user) return
		fetch(`http://localhost:4000/api/bids/user/${user.id}`)
			.then(res => res.json())
			.then(setBids)
			.catch(e => setError(e.message))
			.finally(() => setLoading(false))
	}, [user])

	if (loading) return <div>Завантаження...</div>
	if (error) return <div className='text-red-500'>{error}</div>

	return (
		<div className={rootStyles.wrapper}>
			<NavBar />
			<div className={rootStyles.Container}>
				<BurgerMenu />
				<main className={rootStyles.Main}>
					<h1 className='text-3xl font-bold mb-8 text-center'>Мої заявки</h1>
					{bids.length === 0 ? (
						<div className='text-center text-gray-400'>
							У вас ще немає заявок
						</div>
					) : (
						<div className='space-y-4'>
							{bids.map(bid => (
								<div key={bid.id} className='bg-white rounded-xl shadow p-6'>
									<div className='font-semibold text-lg'>
										{bid.project_title}
									</div>
									<div className='text-gray-500 mb-2'>
										{bid.project_description}
									</div>
									<div>
										Сума заявки: <b>{bid.bid_amount} ₴</b>
									</div>
									<div>
										Статус: <span className='capitalize'>{bid.status}</span>
									</div>
									<div className='text-sm text-gray-400'>
										Подано: {new Date(bid.created_at).toLocaleString()}
									</div>
									<div className='mt-2'>{bid.cover_letter}</div>
								</div>
							))}
						</div>
					)}
				</main>
			</div>
			<Footer />
		</div>
	)
}

export default MyBids
