import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext.jsx'
import styles from '../../../../styles/modules/user/profile/Home.module.css'
import rootStyles from '../../../../styles/shared/layout/root.module.css'
import Mybutton from '../../../../UI/Mybutton'
import BurgerMenu from '../../../shared/components/BurgerMenu'
import { UkrainianWar } from '../../../user/components/UserExpirience/BlockSaveUkraine'
import Footer from '../../../user/components/UserExpirience/Footer'
import NavBar from '../../../user/components/UserExpirience/NavBar'

export const Home = () => {
	const { user, isRegUser } = useAuth()
	const [scrollY, setScrollY] = useState(0)

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const heroTextVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.8,
				ease: 'easeOut',
			},
		},
	}

	const heroImageVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.8,
				ease: 'easeOut',
			},
		},
	}

	const infoAnimation = {
		hidden: {
			y: 100,
			opacity: 0,
		},
		visible: custom => ({
			y: 0,
			opacity: 1,
			transition: { delay: custom * 0.3 },
		}),
	}

	const scrollToFeatures = () => {
		const featuresSection = document.querySelector(`.${styles.featuresSection}`)
		if (featuresSection) {
			featuresSection.scrollIntoView({ behavior: 'smooth' })
		}
	}

	return (
		<div className={rootStyles.wrapper}>
			<NavBar />
			<UkrainianWar />
			<div className={rootStyles.Container}>
				<BurgerMenu />
				<main className={rootStyles.Main}>
					<div className={styles.homeContainer}>
						<section className={styles.heroSection}>
							<div className={styles.heroShape + ' ' + styles.heroShape1}></div>
							<div className={styles.heroShape + ' ' + styles.heroShape2}></div>

							<div className={styles.heroContent}>
								<motion.div
									className={styles.heroTextContainer}
									initial='hidden'
									animate='visible'
									variants={heroTextVariants}
								>
									<div className={styles.heroBadge}>
										<i className='fas fa-crown'></i>
										<span>Преміум платформа</span>
									</div>
									<h1>
										Знайдіть ідеального <span>Фрілансера</span> для вашого
										проекту
									</h1>
									<p>
										З'єднайтеся з талановитими професіоналами з усього світу.
										Опублікуйте свій проект і отримайте пропозиції від
										кваліфікованих фрілансерів за лічені хвилини.
									</p>
									<div className={styles.heroButtons}>
										<Link to='/create-project'>
											<Mybutton style={{ width: '200px', textAlign: 'center' }}>
												<i className='fas fa-plus'></i> Створити проект
											</Mybutton>
										</Link>
										<Link to='/search-freelancers'>
											<Mybutton style={{ width: '200px', textAlign: 'center' }}>
												<i className='fas fa-search'></i> Знайти фрілансерів
											</Mybutton>
										</Link>
									</div>
								</motion.div>

								<motion.div
									className={styles.heroLogoContainer}
									initial='hidden'
									animate='visible'
									variants={heroImageVariants}
								>
									<div className={styles.heroCard}>
										<h3 className={styles.heroCardTitle}>Безпечні платежі</h3>
										<p className={styles.heroCardText}>
											Ваші платежі захищені нашою системою ескроу
										</p>
									</div>
								</motion.div>
							</div>
						</section>

						{/* Features Section */}
						<motion.section
							className={styles.featuresSection}
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true }}
						>
							<motion.h2 variants={infoAnimation} custom={1}>
								Чому обирають нашу платформу
							</motion.h2>
							<div className={styles.featuresGrid}>
								<motion.div
									className={styles.featureCard}
									variants={infoAnimation}
									custom={2}
								>
									<i className='fas fa-shield-alt'></i>
									<h3>Безпечні платежі</h3>
									<p>Ваші платежі захищені нашою системою ескроу</p>
								</motion.div>
								<motion.div
									className={styles.featureCard}
									variants={infoAnimation}
									custom={3}
								>
									<i className='fas fa-users'></i>
									<h3>Перевірені фрілансери</h3>
									<p>Працюйте з перевіреними професіоналами</p>
								</motion.div>
								<motion.div
									className={styles.featureCard}
									variants={infoAnimation}
									custom={4}
								>
									<i className='fas fa-clock'></i>
									<h3>Швидка доставка</h3>
									<p>Отримайте свою роботу швидко та ефективно</p>
								</motion.div>
								<motion.div
									className={styles.featureCard}
									variants={infoAnimation}
									custom={5}
								>
									<i className='fas fa-headset'></i>
									<h3>Підтримка 24/7</h3>
									<p>Наша команда підтримки завжди готова допомогти</p>
								</motion.div>
								<motion.div
									className={styles.featureCard}
									variants={infoAnimation}
									custom={6}
								>
									<i className='fas fa-star'></i>
									<h3>Система рейтингів</h3>
									<p>Оцінюйте та отримуйте оцінки за якість роботи</p>
								</motion.div>
								<motion.div
									className={styles.featureCard}
									variants={infoAnimation}
									custom={7}
								>
									<i className='fas fa-comments'></i>
									<h3>Зручна комунікація</h3>
									<p>Вбудований чат для ефективної взаємодії</p>
								</motion.div>
							</div>
						</motion.section>

						{/* Statistics Section */}
						<motion.section
							className={styles.statsSection}
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true }}
						>
							<div className={styles.statsContainer}>
								<motion.div
									className={styles.statItem}
									variants={infoAnimation}
									custom={1}
								>
									<h3>10K+</h3>
									<p>Активних фрілансерів</p>
								</motion.div>
								<motion.div
									className={styles.statItem}
									variants={infoAnimation}
									custom={2}
								>
									<h3>5K+</h3>
									<p>Завершених проектів</p>
								</motion.div>
								<motion.div
									className={styles.statItem}
									variants={infoAnimation}
									custom={3}
								>
									<h3>98%</h3>
									<p>Задоволених клієнтів</p>
								</motion.div>
								<motion.div
									className={styles.statItem}
									variants={infoAnimation}
									custom={4}
								>
									<h3>50+</h3>
									<p>Країн</p>
								</motion.div>
							</div>
						</motion.section>

						{/* CTA Section */}
						<motion.section
							className={styles.ctaSection}
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true }}
						>
							<motion.h2 variants={infoAnimation} custom={1}>
								Готові почати?
							</motion.h2>
							<motion.p variants={infoAnimation} custom={2}>
								Приєднуйтесь до тисяч задоволених клієнтів та фрілансерів
							</motion.p>
							<motion.div variants={infoAnimation} custom={3}>
								{isRegUser ? (
									<Link to='/profile'>
										<Mybutton style={{ width: '250px', textAlign: 'center' }}>
											Перейти до панелі керування
										</Mybutton>
									</Link>
								) : (
									<Link to='/Login'>
										<Mybutton style={{ width: '200px', textAlign: 'center' }}>
											Залогінитися
										</Mybutton>
									</Link>
								)}
							</motion.div>
						</motion.section>
					</div>
				</main>
			</div>
			<Footer />
		</div>
	)
}
