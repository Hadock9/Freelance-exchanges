import { motion } from 'framer-motion'
import { AlertCircle, ArrowLeft, Check } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/AuthContext'
import styles from '../../../../styles/modules/projects/CreateProject.module.css'
import rootStyles from '../../../../styles/shared/layout/root.module.css'
import Mybutton from '../../../../UI/Mybutton'
import BurgerMenu from '../../../shared/components/BurgerMenu'
import { UkrainianWar } from '../../../user/components/UserExpirience/BlockSaveUkraine'
import Footer from '../../../user/components/UserExpirience/Footer'
import NavBar from '../../../user/components/UserExpirience/NavBar'

const CreateProject = () => {
	const navigate = useNavigate()
	const { user } = useAuth()
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		budget: '',
		deadline: '',
		category: '',
		skills: [],
	})
	const [errors, setErrors] = useState({})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [currentStep, setCurrentStep] = useState(1)
	const totalSteps = 3

	const handleChange = e => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})
	}

	const handleSkillsChange = e => {
		const skillsArray = e.target.value.split(',').map(skill => skill.trim())
		setFormData({
			...formData,
			skills: skillsArray,
		})
	}

	const validateForm = () => {
		const newErrors = {}
		if (!formData.title) newErrors.title = "Назва проекту обов'язкова"
		if (!formData.description)
			newErrors.description = "Опис проекту обов'язковий"
		if (!formData.budget) newErrors.budget = "Бюджет обов'язковий"
		if (!formData.deadline) newErrors.deadline = "Дедлайн обов'язковий"
		if (!formData.category) newErrors.category = "Категорія обов'язкова"
		if (formData.skills.length === 0)
			newErrors.skills = 'Додайте хоча б один навик'

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = async e => {
		e.preventDefault()

		if (!validateForm()) return

		setIsSubmitting(true)

		try {
			// API call to create project would go here
			// For now, just simulate a successful creation
			setTimeout(() => {
				navigate('/projects')
			}, 1000)
		} catch (error) {
			console.error('Error creating project:', error)
			setErrors({ submit: 'Помилка при створенні проекту. Спробуйте ще раз.' })
		} finally {
			setIsSubmitting(false)
		}
	}

	const nextStep = () => {
		if (currentStep < totalSteps) {
			setCurrentStep(currentStep + 1)
		}
	}

	const prevStep = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1)
		}
	}

	const renderStepIndicator = () => {
		return (
			<div className={styles.stepIndicator}>
				{Array.from({ length: totalSteps }).map((_, index) => (
					<div key={index} className={styles.stepContainer}>
						<div
							className={`${styles.step} ${
								index + 1 <= currentStep ? styles.activeStep : ''
							}`}
						>
							{index + 1 < currentStep ? <Check size={16} /> : index + 1}
						</div>
						{index < totalSteps - 1 && (
							<div
								className={`${styles.stepLine} ${
									index + 1 < currentStep ? styles.activeStepLine : ''
								}`}
							/>
						)}
					</div>
				))}
			</div>
		)
	}

	const renderStepContent = () => {
		switch (currentStep) {
			case 1:
				return (
					<>
						<div className={styles.formGroup}>
							<label htmlFor='title'>Назва проекту</label>
							<input
								type='text'
								id='title'
								name='title'
								value={formData.title}
								onChange={handleChange}
								className={errors.title ? styles.inputError : ''}
								placeholder='Введіть назву проекту'
							/>
							{errors.title && (
								<p className={styles.errorMessage}>
									<AlertCircle size={16} /> {errors.title}
								</p>
							)}
						</div>

						<div className={styles.formGroup}>
							<label htmlFor='description'>Опис проекту</label>
							<textarea
								id='description'
								name='description'
								value={formData.description}
								onChange={handleChange}
								className={errors.description ? styles.inputError : ''}
								placeholder='Опишіть ваш проект детально'
								rows='6'
							/>
							{errors.description && (
								<p className={styles.errorMessage}>
									<AlertCircle size={16} /> {errors.description}
								</p>
							)}
						</div>
					</>
				)
			case 2:
				return (
					<>
						<div className={styles.formRow}>
							<div className={styles.formGroup}>
								<label htmlFor='budget'>Бюджет (₴)</label>
								<input
									type='number'
									id='budget'
									name='budget'
									value={formData.budget}
									onChange={handleChange}
									className={errors.budget ? styles.inputError : ''}
									placeholder='Введіть бюджет'
									min='0'
								/>
								{errors.budget && (
									<p className={styles.errorMessage}>
										<AlertCircle size={16} /> {errors.budget}
									</p>
								)}
							</div>

							<div className={styles.formGroup}>
								<label htmlFor='deadline'>Дедлайн</label>
								<input
									type='date'
									id='deadline'
									name='deadline'
									value={formData.deadline}
									onChange={handleChange}
									className={errors.deadline ? styles.inputError : ''}
								/>
								{errors.deadline && (
									<p className={styles.errorMessage}>
										<AlertCircle size={16} /> {errors.deadline}
									</p>
								)}
							</div>
						</div>

						<div className={styles.formGroup}>
							<label htmlFor='category'>Категорія</label>
							<select
								id='category'
								name='category'
								value={formData.category}
								onChange={handleChange}
								className={errors.category ? styles.inputError : ''}
							>
								<option value=''>Виберіть категорію</option>
								<option value='web-development'>Веб-розробка</option>
								<option value='mobile-development'>Мобільна розробка</option>
								<option value='design'>Дизайн</option>
								<option value='writing'>Написання</option>
								<option value='marketing'>Маркетинг</option>
								<option value='other'>Інше</option>
							</select>
							{errors.category && (
								<p className={styles.errorMessage}>
									<AlertCircle size={16} /> {errors.category}
								</p>
							)}
						</div>
					</>
				)
			case 3:
				return (
					<>
						<div className={styles.formGroup}>
							<label htmlFor='skills'>Навики (розділені комами)</label>
							<input
								type='text'
								id='skills'
								name='skills'
								value={formData.skills.join(', ')}
								onChange={handleSkillsChange}
								className={errors.skills ? styles.inputError : ''}
								placeholder='JavaScript, React, Node.js'
							/>
							{errors.skills && (
								<p className={styles.errorMessage}>
									<AlertCircle size={16} /> {errors.skills}
								</p>
							)}
						</div>

						<div className={styles.summarySection}>
							<h3>Підсумок проекту</h3>
							<div className={styles.summaryItem}>
								<span>Назва:</span>
								<span>{formData.title || 'Не вказано'}</span>
							</div>
							<div className={styles.summaryItem}>
								<span>Категорія:</span>
								<span>
									{formData.category
										? formData.category
												.split('-')
												.map(
													word => word.charAt(0).toUpperCase() + word.slice(1)
												)
												.join(' ')
										: 'Не вказано'}
								</span>
							</div>
							<div className={styles.summaryItem}>
								<span>Бюджет:</span>
								<span>
									{formData.budget ? `${formData.budget} ₴` : 'Не вказано'}
								</span>
							</div>
							<div className={styles.summaryItem}>
								<span>Дедлайн:</span>
								<span>
									{formData.deadline
										? new Date(formData.deadline).toLocaleDateString('uk-UA')
										: 'Не вказано'}
								</span>
							</div>
						</div>
					</>
				)
			default:
				return null
		}
	}

	return (
		<div className={rootStyles.wrapper}>
			<NavBar />
			<UkrainianWar />
			<div className={rootStyles.Container}>
				<BurgerMenu />
				<main className={rootStyles.Main}>
					<div className={styles.createProjectContainer}>
						<div className={styles.headerSection}>
							<button
								className={styles.backButton}
								onClick={() => navigate('/projects')}
							>
								<ArrowLeft size={20} />
							</button>
							<h1 className={styles.pageTitle}>Створити новий проект</h1>
						</div>

						{renderStepIndicator()}

						<motion.form
							className={styles.projectForm}
							onSubmit={handleSubmit}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}
						>
							{renderStepContent()}

							{errors.submit && (
								<p className={styles.submitError}>{errors.submit}</p>
							)}

							<div className={styles.formActions}>
								{currentStep > 1 && (
									<Mybutton
										type='button'
										onClick={prevStep}
										style={{ backgroundColor: '#4a5568' }}
									>
										Назад
									</Mybutton>
								)}
								{currentStep < totalSteps ? (
									<Mybutton type='button' onClick={nextStep}>
										Далі
									</Mybutton>
								) : (
									<Mybutton type='submit' disabled={isSubmitting}>
										{isSubmitting ? 'Створення...' : 'Створити проект'}
									</Mybutton>
								)}
							</div>
						</motion.form>
					</div>
				</main>
			</div>
			<Footer />
		</div>
	)
}

export default CreateProject
