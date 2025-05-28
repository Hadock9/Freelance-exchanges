// src/components/Login.js
import { jwtDecode } from 'jwt-decode'
import { Lock, LockOpen, Mail } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext'
import { validateInput } from '../../../../js/FormValidation'
import Logon from '../../../../js/loginGoogle'
import styles from '../../../../styles/Auth/RegistrationLogin.module.css'
import formStyles from '../../../../styles/shared/components/CustomForm.module.css'

export function Login() {
	const navigate = useNavigate()
	const { setIsRegUser, setUser } = useAuth()
	// Станові змінні для зберігання значень вводу форми
	const [Email, setEmail] = useState('')
	const [Password, setPassword] = useState('')
	const [isVisiblePassword, setisVisiblePassword] = useState(false)
	const [TypePassword, setTypePassword] = useState('password')
	const [FormValid, setFormValid] = useState(false)

	// Змінні стану, щоб відстежувати, чи ввід було сфокусовано
	const [EmailDirty, setEmailDirty] = useState(false)
	const [PasswordDirty, setPasswordDirty] = useState(false)
	// Повідомлення про помилки для валідації
	const [EmailError, setEmailError] = useState('Email не може бути пустим')
	const [PasswordError, setPasswordError] = useState(
		'Password не може бути пустим'
	)
	// Повідомлення про загальні помилки
	const [GeneralError, setGeneralError] = useState('')

	// Обробник, щоб позначити ввід як "доторкнутий", коли він втрачає фокус
	const blurHandler = e => {
		switch (e.target.name) {
			case 'Email':
				setEmailDirty(true)
				break
			case 'Password':
				setPasswordDirty(true)
				break
			default:
				break
		}
	}

	// Обробник зміни вводу для Email з валідацією
	const EmailHandler = e => {
		setEmail(e.target.value)
		setEmailError(validateInput(e.target.value))
	}

	// Обробник зміни вводу для пароля
	const PasswordHandler = e => {
		setPassword(e.target.value)
		setPasswordError(validateInput(e.target.value))
	}

	// Обробник зміни типу паролю для видимості
	const ChangeTypePassword = () => {
		setisVisiblePassword(!isVisiblePassword)
		setTypePassword(isVisiblePassword ? 'password' : 'text')
	}

	// Хук ефекту для визначення дійсності форми на основі вводу та стану помилок
	useEffect(() => {
		setFormValid(!EmailError && !PasswordError)
	}, [EmailError, PasswordError])

	// Обробник відправлення форми
	const handleSubmit = async e => {
		e.preventDefault()

		const LoginData = {
			Email: Email,
			Password: Password,
		}
		if (FormValid) {
			try {
				const response = await fetch('http://localhost:4000/api/auth/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(LoginData),
				})
				console.log('Response status:', response.status)

				let data
				try {
					data = await response.json()
					console.log('Response data:', data)
				} catch (err) {
					console.error('Error parsing JSON:', err)
					setGeneralError('Помилка обробки відповіді сервера.')
					return
				}

				if (response.ok) {
					console.log('Login successful, token:', data.token)
					localStorage.setItem('token', data.token)
					const decoded = jwtDecode(data.token)
					console.log('Decoded token:', decoded)
					setIsRegUser(true)
					setUser(decoded)
					navigate('/Home')
				} else {
					console.log('Login failed:', data.message)
					if (data.message && data.message.includes('Email not found')) {
						setEmailError('Email не знайдено.')
					} else if (
						data.message &&
						data.message.includes('Incorrect password')
					) {
						setPasswordError('Неправильний пароль.')
					} else {
						console.error('Server error:', data)
						setGeneralError('Помилка на сервері. Спробуйте пізніше.')
					}
				}
			} catch (error) {
				console.error('Network error:', error)
				setGeneralError("Помилка з'єднання з сервером.")
			}
		}
	}

	return (
		<div className={styles.Container}>
			<div className={styles.RightBlock}></div>

			<div className={styles.LeftBlock}>
				<div className={styles.RegForm}>
					<div className={styles.RegFormLine}></div>
					<form onSubmit={handleSubmit} noValidate>
						<h1 className={styles.RegFormHeader}>Форма входу</h1>

						{/* Поле Email */}
						<div className={styles.RegFormFullBlock}>
							{EmailDirty && EmailError && (
								<div className={styles.RegFormError}>{EmailError}</div>
							)}
							<div className={styles.RegFormBlock}>
								<Mail />
								<input
									className={formStyles.CustomInput}
									type='email'
									name='Email'
									value={Email}
									placeholder='Email'
									onBlur={blurHandler}
									onChange={EmailHandler}
									required
								/>
							</div>
						</div>

						{/* Поле Пароль */}
						<div className={styles.RegFormFullBlock}>
							{PasswordDirty && PasswordError && (
								<div className={styles.RegFormError}>{PasswordError}</div>
							)}
							<div className={styles.RegFormBlock}>
								<div
									onClick={ChangeTypePassword}
									className={styles.RegFormBlockPassword}
								>
									{isVisiblePassword ? <LockOpen /> : <Lock />}
								</div>
								<input
									className={formStyles.CustomInput}
									type={TypePassword}
									name='Password'
									value={Password}
									onBlur={blurHandler}
									onChange={PasswordHandler}
									placeholder='Пароль'
									required
								/>
							</div>
						</div>

						{/* Загальні помилки */}
						{GeneralError && (
							<div className={styles.RegFormError}>{GeneralError}</div>
						)}

						{/* Кнопка відправлення */}
						<div className={`${styles.RegFormBlock} ${styles.RegFormButton}`}>
							<button
								type='submit'
								disabled={!FormValid} // Вимкнути кнопку, якщо форма не дійсна
								className={styles.CustomButtonSubmit}
							>
								Увійти
							</button>
						</div>
					</form>

					<div className={styles.AfterForm}>
						<Link to={'/Registration'}>
							Don't have an account yet? Register
						</Link>
					</div>
					<div className={styles.AfterForm}>
						<Link to={'/ResetPassword'}>I Forgot My Password</Link>
					</div>
					<div className={styles.AfterForm}>
						<Logon />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
