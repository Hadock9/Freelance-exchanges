import { Lock } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { validateInput } from '../../../../js/FormValidation'
import styles from '../../../../styles/Auth/RegistrationLogin.module.css'
import formStyles from '../../../../styles/shared/components/CustomForm.module.css'

export function ResetPassword() {
	// Станові змінні для зберігання значень вводу форми
	const [Email, setEmail] = useState('')
	const [FormValid, setFormValid] = useState(false)

	// Змінні стану, щоб відстежувати, чи ввід було сфокусовано
	const [EmailDirty, setEmailDirty] = useState(false)

	// Повідомлення про помилки для валідації
	const [EmailError, setEmailError] = useState('Email не може бути пустим')

	// Обробник, щоб позначити ввід як "доторкнутий", коли він втрачає фокус
	const blurHandler = e => {
		switch (e.target.name) {
			case 'Email':
				setEmailDirty(true)
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

	// Хук ефекту для визначення дійсності форми на основі вводу та стану помилок
	useEffect(() => {
		setFormValid(!EmailError) // Визначає, чи форма є дійсною
	}, [EmailError])

	// Обробник відправлення форми
	const handleSubmit = e => {
		e.preventDefault() // Запобігає стандартній поведінці форми
		if (FormValid) {
			// Обробити реєстрацію тут
			console.log('Форма відправлена ') // Повідомлення для успішної відправки
		}
	}
	return (
		<div className={styles.Container}>
			<div className={styles.RightBlock}></div>

			<div className={styles.LeftBlock}>
				<div className={styles.RegForm}>
					<div className={styles.RegFormLine}></div>
					<form onSubmit={handleSubmit} noValidate>
						<h1 className={styles.RegFormHeader}>Форма відновлення паролю</h1>

						{/* Поле Email */}
						<div className={styles.RegFormFullBlock}>
							{EmailDirty && EmailError && (
								<div className={styles.RegFormError}>{EmailError}</div>
							)}
							<div className={styles.RegFormBlock}>
								<Lock />
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

						<div className={`${styles.RegFormBlock} ${styles.RegFormButton}`}>
							<button
								type='submit'
								disabled={!FormValid} // Вимкнути кнопку, якщо форма не дійсна
								className={styles.CustomButtonSubmit}
							>
								Відновити пароль
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
