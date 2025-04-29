import { motion } from 'framer-motion'

import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useMemo, useState } from 'react'
import {
	FaAward,
	FaBriefcase,
	FaHistory,
	FaMapMarkerAlt,
	FaStar,
} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import BurgerMenu from '../../components/BurgerMenu'
import MyLoader from '../../components/Disclaimer/Loader'
import { NotAuthorized } from '../../components/Disclaimer/NotAuthorized'
import Footer from '../../components/UserExpirience/Footer'
import NavBar from '../../components/UserExpirience/NavBar'
import { useAuth } from '../../context/AuthContext'
import useFetchGet from '../../hooks/useFetchGet'
import {
	validateDate_of_birth,
	validateLastName,
	validateName,
	validatePhone,
} from '../../js/FormValidation'
import { formatDate } from '../../js/TimeValidation'
import rootstyle from '../../styles/root.module.css'

export function Profile() {
	const navigate = useNavigate()
	const [activeTab, setActiveTab] = useState('history')

	const [FormValid, setFormValid] = useState(false)
	const { setIsRegUser, setUser, user, isRegUser } = useAuth()
	const [UserProfile, setUserProfile] = useState(null)
	const [formData, setFormData] = useState({
		id: '',
		firstName: '',
		lastName: '',
		date_of_birth: '',
		gender: '',
		email: '',
		documentNumber: '',
		phone: '',
		country: '',
		pictureSrc: '',
	})
	const [AllCountries, setAllCountries] = useState([])
	// api з усіма крїнами світу
	const { Data, isLoading, failedToFetch } = useFetchGet({
		url: 'https://restcountries.com/v3.1/all',
	})
	useEffect(() => {
		if (Data) {
			setAllCountries(Data)
		}
	}, [Data])

	const [First_NameError, setFirst_NameError] = useState('')
	const [Last_NameError, setLast_NameError] = useState('')
	const [Date_of_birthError, setDate_of_birthError] = useState('')
	const [PhoneError, setPhoneError] = useState('')
	const [CountryError, setCountryError] = useState('')

	const [First_NameDirty, setFirst_NameDirty] = useState(false)
	const [Last_NameDirty, setLast_NameDirty] = useState(false)
	const [Date_of_birthDirty, setDate_of_birthDirty] = useState(false)
	const [PhoneDirty, setPhoneDirty] = useState(false)
	const [CountryDirty, setCountryDirty] = useState(false)

	useEffect(() => {
		if (
			Date_of_birthError ||
			First_NameError ||
			Last_NameError ||
			CountryError ||
			PhoneError
		) {
			setFormValid(false)
		} else {
			setFormValid(true)
		}
	}, [
		PhoneError,
		First_NameError,
		Last_NameError,
		CountryError,
		Date_of_birthError,
	])
	// Обробник зміни вводу для PhoneHandler з валідацією
	const PhoneHandler = e => {
		handleChange(e)
		setPhoneError(validatePhone(e.target.value))
	}

	// Обробник зміни вводу для прізвища з валідацією
	const Last_NameHandler = e => {
		handleChange(e)
		setLast_NameError(validateLastName(e.target.value))
	}
	// Обробник зміни вводу для Date_of_birthHandler з валідацією
	const Date_of_birthHandler = e => {
		handleChange(e)
		console.log(e.target.value)
		setDate_of_birthError(validateDate_of_birth(e.target.value))
	}

	// Обробник зміни вводу для імені з валідацією
	const First_NameHandler = e => {
		handleChange(e)

		setFirst_NameError(validateName(e.target.value))
	}

	// Оновлюємо UserProfile, коли user змінюється
	useEffect(() => {
		if (user) {
			setUserProfile(user)
			setFormData({
				id: user.id,
				firstName: user.first_name,
				lastName: user.last_name,
				date_of_birth: formatDate(user.date_of_birth),
				gender: user.gender,
				email: user.email,
				created_at: formatDate(user.created_at),
				phone: user.phone_number,
				country: user.country,
				pictureSrc: user.picture,
			})
		}
	}, [user])

	const handleChange = e => {
		const { name, value } = e.target
		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}))
	}
	// Обробник зміни вводу для CountryHandler з валідацією
	const CountryHandler = options => {
		setFormData(prevState => ({
			...prevState,
			country: options.label,
		}))
	}

	const handleSave = async e => {
		e.preventDefault()

		const updatedData = {
			id: formData.id,
			first_name: formData.firstName,
			last_name: formData.lastName,
			date_of_birth: formData.date_of_birth,
			gender: formData.gender,
			phone: formData.phone,
			country: formData.country,
		}

		fetch('http://localhost:4000/api/user/updateProfile', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify(updatedData),
		})
			.then(response => response.json())
			.then(data => {
				if (data.error) {
					console.log('Error:', data.error)
					alert(data.error)
					return
				}
				console.log('Login successful:', data)
				localStorage.setItem('token', data.token)
				console.log('Оновлення даних пройшло успішно:', data.message)
				const decoded = jwtDecode(data.token)
				setIsRegUser(true)
				setUser(decoded)
				navigate(0)
			})
			.catch(error => {
				console.error('Error during login:', error)
			})
	}

	if (!isRegUser) {
		return <NotAuthorized />
	}

	if (!UserProfile) {
		return <div>Завантаження даних профілю...</div>
	}
	if (isLoading) {
		return <MyLoader />
	}

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
		<div className={rootstyle.wrapper}>
			<NavBar />
			<div className={rootstyle.Container}>
				<BurgerMenu />
				<main className={rootstyle.Main}>
					<div className='container mx-auto px-4 py-8 max-w-6xl'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className='bg-white rounded-xl shadow-lg overflow-hidden mb-8'
						>
							<div className='p-6'>
								<div className='flex flex-col md:flex-row gap-6'>
									<div className='flex-shrink-0'>
										<img
											src={
												UserProfile.picture || 'https://via.placeholder.com/150'
											}
											alt={`${UserProfile.first_name} ${UserProfile.last_name}`}
											className='w-32 h-32 rounded-full border border-gray-200'
										/>
									</div>
									<div className='flex-grow'>
										<h1 className='text-3xl font-bold text-gray-800 mb-2'>
											{UserProfile.first_name} {UserProfile.last_name}
										</h1>
										<p className='text-xl text-gray-600 mb-2'>
											{UserProfile.title || 'Фрілансер'}
										</p>

										<div className='flex items-center mb-2'>
											<div className='flex mr-2'>
												{renderStars(UserProfile.rating || 0)}
											</div>
											<span className='text-sm text-gray-500'>
												({UserProfile.rating || 0})
											</span>
										</div>

										<div className='flex items-center text-gray-600 mb-2'>
											<FaMapMarkerAlt className='mr-2 text-gray-400' />
											<span>{UserProfile.country || 'Не вказано'}</span>
										</div>

										<div className='flex items-center text-gray-600 mb-2'>
											<FaBriefcase className='mr-2 text-gray-400' />
											<span>
												{UserProfile.completed_projects || 0} виконаних проектів
											</span>
										</div>

										<p className='text-gray-600 mt-4'>
											{UserProfile.description || 'Опис відсутній'}
										</p>

										<div className='flex flex-wrap gap-2 mt-4'>
											{UserProfile.skills && UserProfile.skills.length > 0 ? (
												UserProfile.skills.map(skill => (
													<span
														key={skill}
														className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm'
													>
														{skill}
													</span>
												))
											) : (
												<span className='text-gray-500'>
													Навички не вказані
												</span>
											)}
										</div>
									</div>
								</div>
							</div>
						</motion.div>

						<div className='bg-white rounded-xl shadow-lg overflow-hidden'>
							<div className='border-b border-gray-200'>
								<div className='flex'>
									<button
										onClick={() => setActiveTab('history')}
										className={`flex-1 py-4 px-6 text-center font-medium ${
											activeTab === 'history'
												? 'text-yellow-500 border-b-2 border-yellow-500'
												: 'text-gray-500 hover:text-gray-700'
										}`}
									>
										<FaHistory className='inline-block mr-2' />
										Історія проектів
									</button>
									<button
										onClick={() => setActiveTab('achievements')}
										className={`flex-1 py-4 px-6 text-center font-medium ${
											activeTab === 'achievements'
												? 'text-yellow-500 border-b-2 border-yellow-500'
												: 'text-gray-500 hover:text-gray-700'
										}`}
									>
										<FaAward className='inline-block mr-2' />
										Досягнення
									</button>
								</div>
							</div>

							<div className='p-6'>
								{activeTab === 'history' ? (
									<div className='space-y-6'>
										{UserProfile.project_history &&
										UserProfile.project_history.length > 0 ? (
											UserProfile.project_history.map(project => (
												<motion.div
													key={project.id}
													initial={{ opacity: 0, y: 10 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ duration: 0.3 }}
													className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'
												>
													<div className='flex justify-between items-start mb-3'>
														<div>
															<h3 className='text-lg font-semibold text-gray-800'>
																{project.projectName}
															</h3>
															<p className='text-gray-600'>
																Клієнт: {project.client}
															</p>
														</div>
														<div className='text-right'>
															<p className='text-sm text-gray-500'>
																{formatDate(project.date)}
															</p>
															<p className='text-lg font-semibold text-yellow-500'>
																${project.earnings}
															</p>
														</div>
													</div>

													<div className='flex items-center mb-2'>
														<div className='flex mr-2'>
															{renderStars(project.rating)}
														</div>
														<span className='text-sm text-gray-500'>
															({project.rating})
														</span>
													</div>

													<p className='text-gray-600 italic'>
														"{project.review}"
													</p>
												</motion.div>
											))
										) : (
											<div className='text-center py-8 text-gray-500'>
												<p>Історія проектів відсутня</p>
											</div>
										)}
									</div>
								) : (
									<div className='space-y-6'>
										{UserProfile.achievements &&
										UserProfile.achievements.length > 0 ? (
											UserProfile.achievements.map(achievement => (
												<motion.div
													key={achievement.id}
													initial={{ opacity: 0, y: 10 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ duration: 0.3 }}
													className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'
												>
													<div className='flex justify-between items-start'>
														<div>
															<h3 className='text-lg font-semibold text-gray-800'>
																{achievement.title}
															</h3>
															<p className='text-gray-600'>
																{achievement.description}
															</p>
														</div>
														<p className='text-sm text-gray-500'>
															{formatDate(achievement.date)}
														</p>
													</div>
												</motion.div>
											))
										) : (
											<div className='text-center py-8 text-gray-500'>
												<p>Досягнення відсутні</p>
											</div>
										)}
									</div>
								)}
							</div>
						</div>
					</div>
				</main>
			</div>
			<Footer />
		</div>
	)
}

export default Profile

const customStyles = {
	control: provided => ({
		...provided,
		backgroundColor: 'transparent',
		border: 'none',
		boxShadow: 'none',
	}),
	option: provided => ({
		...provided,
		padding: 0,
	}),
	singleValue: provided => ({
		...provided,
		color: 'white',
	}),
	placeholder: provided => ({
		...provided,
		color: 'black',
	}),
}

function CountrySelector({ value, onChange }) {
	const options = useMemo(() => countryList().getData(), [])

	return (
		<Select
			options={options}
			value={options.find(option => option.label === value)}
			onChange={onChange}
			styles={customStyles}
			className='border-none'
		/>
	)
}
