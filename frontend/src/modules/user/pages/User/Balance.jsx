import React, { useState } from 'react'
import { useAuth } from '../../../../context/AuthContext.jsx'
import useFetchGet from '../../../../hooks/useFetchGet'
import styles from '../../../../styles/shared/layout/root.module.css'
import BurgerMenu from '../../../shared/components/BurgerMenu'
import { CheckFetch } from '../../../shared/components/Disclaimer/BadFatchDisclaimer'
import Loader from '../../../shared/components/Disclaimer/Loader'
import Footer from '../../../user/components/UserExpirience/Footer'
import NavBar from '../../../user/components/UserExpirience/NavBar'
import { CreditCard } from '../../components/UserExpirience/CreditCard'

const Balance = () => {
	const { user } = useAuth()
	const [userBalance, setUserBalance] = useState(null)
	const { Data, isLoading, failedToFetch } = useFetchGet({
		url: `http://localhost:4000/api/user/${user?.id}/getMoney`,
	})

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.header}>
					<BurgerMenu />
					<NavBar />
				</div>
				<div className={styles.main}>
					<div className={styles.balance}>
						<h1>Баланс</h1>
						{isLoading ? (
							<Loader />
						) : failedToFetch ? (
							<CheckFetch />
						) : (
							<h2>{Data?.balance} грн</h2>
						)}
					</div>
					<div className={styles.creditCard}>
						<CreditCard />
					</div>
				</div>
				<Footer />
			</div>
		</div>
	)
}

export default Balance
