import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import useFetchGet from '../../../hooks/useFetchGet'
import styles from '../../../styles/shared/layout/root.module.css'
import { CreditCard } from '../../user/components/UserExpirience/CreditCard'
import Footer from '../../user/components/UserExpirience/Footer'
import NavBar from '../../user/components/UserExpirience/NavBar'
import BurgerMenu from '../components/BurgerMenu'
import { CheckFetch } from '../components/Disclaimer/BadFatchDisclaimer'
import MyLoader from '../components/Disclaimer/Loader'

export function Donate() {
	const { user } = useAuth()
	const [userBalance, setUserBalance] = useState(null)
	const { Data, isLoading, failedToFetch } = useFetchGet({
		url: `http://localhost:4000/api/user/${user?.id}/getMoney`,
	})

	useEffect(() => {
		if (Data && Data[0]?.bonus_money !== undefined) {
			setUserBalance(Data[0].bonus_money)
		}
	}, [Data])

	if (failedToFetch) {
		return <CheckFetch />
	}
	if (isLoading) {
		return <MyLoader />
	}
	return (
		<div className={styles.wrapper}>
			<NavBar />

			<div className={styles.Container}>
				<BurgerMenu />

				<main className={styles.Main}>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ ease: 'easeIn', duration: 0.8 }}
					>
						{userBalance == null ? (
							<p>No balance information available.</p>
						) : (
							<div className='flex flex-col'>
								<div className='flex justify-center flex-col items-center'>
									<div className='flex justify-center '>
										<div className='text-xl my-5'>Ваш поточний баланс:</div>
										<div className='flex items-center font-bold text-2xl ml-2'>
											{userBalance} UAH
										</div>
									</div>
									<div className='text-xl '>Задонатьте нам)</div>
								</div>
								<CreditCard action={'sub'} userBalance={userBalance} />
							</div>
						)}
					</motion.div>
				</main>
			</div>
			<Footer />
		</div>
	)
}
export default Donate
