import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../../context/AuthContext'
import useFetchGet from '../../../../hooks/useFetchGet'
import { formatDate } from '../../../../js/TimeValidation'
import styles from '../../../../styles/shared/layout/root.module.css'
import BurgerMenu from '../../../shared/components/BurgerMenu'
import Loader from '../../../shared/components/Disclaimer/Loader'
import Footer from '../../../user/components/UserExpirience/Footer'
import NavBar from '../../components/UserExpirience/NavBar'

const Notifications = () => {
	const { user } = useAuth()
	const [UserId, setUserId] = useState([])
	const [Notifications, setNotification] = useState([])
	const { Data, isLoading, failedToFetch } = useFetchGet({
		url: 'http://localhost:4000/api/notifications',
		id: UserId,
	})

	useEffect(() => {
		if (user) {
			setUserId(user.id)
		}
	}, [user]) //

	useEffect(() => {
		if (Data) {
			setNotification(Data)
		}
	}, [Data])

	if (isLoading) {
		return <Loader />
	}

	return (
		<div className={styles.wrapper}>
			<NavBar />

			<div className={styles.Container}>
				<BurgerMenu />

				<main className={styles.Main}>
					{Notifications.map(Notification => (
						<div
							className='w-full min-h-[100px] h-[120px] bg-gray-800 text-gray-200 flex gap-4 items-center justify-evenly p-4 rounded-lg my-5'
							key={Notification.id}
						>
							<div>{Notification.id}</div>
							<div>{Notification.match_id}</div>
							<div className='min-w-[20%] flex flex-col items-center'>
								<div className='flex'>
									<div> {Notification.content} </div>
								</div>
							</div>
							<div className='flex flex-col justify-evenly items-center'>
								<div></div>
								<div>{formatDate(Notification.created_at)}</div>
								<div>Status: {Notification.type}</div>
							</div>
						</div>
					))}
				</main>
			</div>
			<Footer />
		</div>
	)
}

export default Notifications
