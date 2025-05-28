import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	ThemeProvider,
	Typography,
	createTheme,
} from '@mui/material'
import { motion } from 'framer-motion'
import { ChevronUp, HelpCircle, Search } from 'lucide-react'
import React, { useState } from 'react'
import rootStyles from '../../../styles/shared/layout/root.module.css'
import styles from '../../../styles/shared/pages/FAQ.module.css'
import Footer from '../../user/components/UserExpirience/Footer'
import NavBar from '../../user/components/UserExpirience/NavBar'
import BurgerMenu from '../components/BurgerMenu'

const theme = createTheme({
	palette: {
		primary: {
			main: '#cb172a',
		},
	},
})

function FAQ() {
	const [searchTerm, setSearchTerm] = useState('')
	const [activeCategory, setActiveCategory] = useState('all')

	const FAQInfo = [
		{
			category: 'general',
			Summary: 'Що таке фріланс платформа?',
			Details:
				'Наша платформа - це безпечне місце для співпраці між замовниками та фрілансерами. Ми забезпечуємо безпечні платежі, захист угод та зручну комунікацію між учасниками.',
		},
		{
			category: 'general',
			Summary: 'Як почати користуватися платформою?',
			Details:
				'Для початку роботи потрібно зареєструватися на платформі, заповнити свій профіль та підтвердити електронну пошту. Після цього ви зможете створювати проекти або пропонувати свої послуги.',
		},
		{
			category: 'general',
			Summary: 'Які переваги використання платформи?',
			Details:
				'Наша платформа пропонує безпечні платежі через систему ескроу, перевірених фрілансерів, зручну комунікацію, систему рейтингів та відгуків, а також підтримку 24/7.',
		},
		{
			category: 'general',
			Summary: 'Чи можна використовувати платформу з мобільного пристрою?',
			Details:
				'Так, наша платформа повністю адаптована для мобільних пристроїв. Ви можете користуватися всіма функціями через браузер на вашому смартфоні або планшеті.',
		},
		{
			category: 'general',
			Summary: 'Які мови підтримуються на платформі?',
			Details:
				'Наразі платформа підтримує українську та англійську мови. Ми плануємо додати більше мов у майбутньому.',
		},
		{
			category: 'projects',
			Summary: 'Як створити проект на платформі?',
			Details:
				'Для створення проекту натисніть кнопку "Створити проект", заповніть деталі проекту, вкажіть бюджет та необхідні навики. Після публікації ви отримаєте пропозиції від фрілансерів.',
		},
		{
			category: 'projects',
			Summary: 'Як вибрати правильного фрілансера для проекту?',
			Details:
				'При виборі фрілансера зверніть увагу на його рейтинг, відгуки від попередніх клієнтів, портфоліо робіт та відповідність вашим вимогам. Також можна провести співбесіду через платформу.',
		},
		{
			category: 'projects',
			Summary: 'Як встановити бюджет проекту?',
			Details:
				'Бюджет проекту встановлюється виходячи з його складності, термінів виконання та ринкових цін. Ви можете вказати як фіксовану суму, так і діапазон.',
		},
		{
			category: 'projects',
			Summary: 'Чи можна змінити умови проекту після його створення?',
			Details:
				'Так, ви можете редагувати проект до того, як він буде прийнятий фрілансером. Після початку роботи зміни можливі за узгодженням з фрілансером.',
		},
		{
			category: 'projects',
			Summary: 'Як відстежувати прогрес проекту?',
			Details:
				'На платформі є спеціальний розділ для відстеження прогресу, де ви можете бачити етапи виконання, завантажені файли та комунікацію з фрілансером.',
		},
		{
			category: 'projects',
			Summary: 'Що робити, якщо проект не відповідає вимогам?',
			Details:
				'У разі невідповідності вимогам, ви можете запросити доопрацювання або звернутися до служби підтримки для вирішення конфліктної ситуації.',
		},
		{
			category: 'payments',
			Summary: 'Як працює система ескроу?',
			Details:
				'Система ескроу захищає ваші платежі. Кошти блокуються на платформі до успішного завершення проекту. Після підтвердження замовником виконання роботи, кошти автоматично переказуються фрілансеру.',
		},
		{
			category: 'payments',
			Summary: 'Які способи оплати доступні?',
			Details:
				'На платформі доступні різні способи оплати: банківські картки, електронні гаманці, банківські перекази. Всі платежі захищені протоколами безпеки.',
		},
		{
			category: 'payments',
			Summary: 'Які комісії бере платформа?',
			Details:
				'Платформа бере невелику комісію з успішно завершених проектів. Комісія включає в себе захист платежів, підтримку 24/7 та технічне обслуговування платформи.',
		},
		{
			category: 'payments',
			Summary: 'Як відбувається виплата фрілансеру?',
			Details:
				'Після підтвердження замовником завершення проекту, кошти автоматично переказуються на рахунок фрілансера. Виплата відбувається протягом 1-2 банківських днів.',
		},
		{
			category: 'payments',
			Summary: 'Чи можна розділити оплату на частини?',
			Details:
				'Так, для великих проектів можна налаштувати поетапну оплату. Кожен етап має свій бюджет, який виплачується після його завершення.',
		},
		{
			category: 'payments',
			Summary: 'Як повернути кошти у разі проблем?',
			Details:
				'У разі проблем з проектом, ви можете звернутися до служби підтримки. Ми розглядаємо кожну ситуацію індивідуально та приймаємо рішення щодо повернення коштів.',
		},
		{
			category: 'freelancers',
			Summary: 'Як стати фрілансером на платформі?',
			Details:
				'Зареєструйтесь на платформі, заповніть свій профіль, додайте портфоліо та навики. Після цього ви зможете переглядати проекти та надсилати пропозиції замовникам.',
		},
		{
			category: 'freelancers',
			Summary: 'Як створити привабливий профіль?',
			Details:
				'Для створення привабливого профілю додайте якісне фото, детально опишіть свій досвід, навики та досягнення. Також важливо додати портфоліо з вашими найкращими роботами.',
		},
		{
			category: 'freelancers',
			Summary: 'Як знайти відповідні проекти?',
			Details:
				'Ви можете використовувати пошук та фільтри для пошуку проектів за категоріями, бюджетом та термінами. Також рекомендуємо налаштувати сповіщення про нові проекти.',
		},
		{
			category: 'freelancers',
			Summary: 'Як працює система рейтингів?',
			Details:
				'Рейтинг формується на основі відгуків від клієнтів, якості роботи, термінів виконання та активності на платформі. Високий рейтинг допомагає отримувати більше замовлень.',
		},
		{
			category: 'freelancers',
			Summary: 'Чи можна працювати з кількома замовниками одночасно?',
			Details:
				'Так, ви можете працювати над кількома проектами одночасно, але важливо правильно розподіляти свій час та дотримуватися дедлайнів.',
		},
		{
			category: 'freelancers',
			Summary: 'Як захистити свої права як фрілансера?',
			Details:
				'Платформа забезпечує захист прав фрілансерів через систему ескроу, чіткі умови договору та підтримку служби безпеки. У разі проблем ви можете звернутися до служби підтримки.',
		},
		{
			category: 'security',
			Summary: 'Як захищені мої платежі?',
			Details:
				'Всі платежі проходять через безпечну систему ескроу. Кошти блокуються до завершення проекту, що захищає як замовників, так і фрілансерів від шахрайства.',
		},
		{
			category: 'security',
			Summary: 'Як захищені мої персональні дані?',
			Details:
				'Ми використовуємо сучасні протоколи шифрування для захисту ваших даних. Всі персональні дані зберігаються на захищених серверах та не передаються третім особам.',
		},
		{
			category: 'security',
			Summary: 'Як перевірити надійність фрілансера?',
			Details:
				'На платформі ви можете переглянути рейтинг фрілансера, відгуки від попередніх клієнтів, історію роботи та верифікацію профілю.',
		},
		{
			category: 'security',
			Summary: 'Що робити при виявленні шахрайства?',
			Details:
				'Якщо ви виявили ознаки шахрайства, негайно повідомте про це службі безпеки платформи. Ми оперативно розглядаємо такі повідомлення та вживаємо необхідних заходів.',
		},
		{
			category: 'security',
			Summary: 'Як захистити свій акаунт?',
			Details:
				'Рекомендуємо використовувати сильний пароль, двофакторну автентифікацію та регулярно оновлювати налаштування безпеки. Також не передавайте доступ до акаунту третім особам.',
		},
		{
			category: 'security',
			Summary: 'Чи безпечно передавати файли через платформу?',
			Details:
				'Так, всі файли, передані через платформу, захищені шифруванням та проходять перевірку на віруси. Ми рекомендуємо використовувати вбудований файлообмінник.',
		},
		{
			category: 'support',
			Summary: 'Що робити при виникненні конфліктів?',
			Details:
				'У разі виникнення конфліктів, наша служба підтримки допоможе вирішити проблему. Ми розглядаємо всі спори та приймаємо справедливі рішення на основі умов договору.',
		},
		{
			category: 'support',
			Summary: "Як зв'язатися з підтримкою?",
			Details:
				"Ви можете зв'язатися з підтримкою через форму зворотного зв'язку на платформі, електронну пошту або телефон. Наші спеціалісти доступні 24/7.",
		},
		{
			category: 'support',
			Summary: 'Який час відповіді служби підтримки?',
			Details:
				'Ми намагаємося відповідати на всі звернення протягом 24 годин. Термінові питання розглядаються в пріоритетному порядку.',
		},
		{
			category: 'support',
			Summary: 'Чи можна отримати консультацію щодо проекту?',
			Details:
				"Так, наша служба підтримки надає консультації щодо створення проектів, вибору фрілансерів та інших питань, пов'язаних з роботою на платформі.",
		},
		{
			category: 'support',
			Summary: 'Як повідомити про технічні проблеми?',
			Details:
				"При виявленні технічних проблем, ви можете повідомити про них через форму зворотного зв'язку або написати на спеціальну адресу для технічної підтримки.",
		},
		{
			category: 'support',
			Summary: 'Чи надається навчання для нових користувачів?',
			Details:
				'Так, ми надаємо базове навчання для нових користувачів платформи. Ви можете переглянути навчальні матеріали або записатися на онлайн-консультацію.',
		},
		{
			category: 'reviews',
			Summary: 'Як оцінюється якість роботи?',
			Details:
				'Після завершення проекту замовник та фрілансер можуть залишити відгуки один про одного. Це допомагає будувати репутацію та підтримувати високу якість роботи на платформі.',
		},
		{
			category: 'reviews',
			Summary: 'Як залишити відгук про роботу?',
			Details:
				'Після завершення проекту система автоматично запропонує залишити відгук. Ви можете оцінити роботу за кількома критеріями та написати коментар.',
		},
		{
			category: 'reviews',
			Summary: 'Чи можна відредагувати свій відгук?',
			Details:
				'Так, ви можете відредагувати свій відгук протягом 7 днів після його публікації. Після цього терміну відгук стає постійним.',
		},
		{
			category: 'reviews',
			Summary: 'Як відгуки впливають на рейтинг?',
			Details:
				'Відгуки є одним з основних факторів формування рейтингу. Позитивні відгуки підвищують рейтинг, а негативні - знижують його.',
		},
		{
			category: 'reviews',
			Summary: 'Що робити при отриманні несправедливого відгуку?',
			Details:
				'Якщо ви вважаєте відгук несправедливим, ви можете звернутися до служби підтримки. Ми розглядаємо такі звернення та можемо видалити відгук, якщо він порушує правила.',
		},
		{
			category: 'reviews',
			Summary: 'Чи можна відмовитися від відгуку?',
			Details:
				"Ні, відгуки є обов'язковою частиною роботи на платформі. Це допомагає підтримувати прозорість та довіру між учасниками.",
		},
	]

	const categories = [
		{ id: 'all', name: 'Всі питання' },
		{ id: 'general', name: 'Загальні' },
		{ id: 'projects', name: 'Проекти' },
		{ id: 'freelancers', name: 'Фрілансери' },
		{ id: 'payments', name: 'Платежі' },
		{ id: 'security', name: 'Безпека' },
		{ id: 'support', name: 'Підтримка' },
		{ id: 'reviews', name: 'Відгуки' },
	]

	const filteredFAQs = FAQInfo.filter(faq => {
		const matchesSearch =
			faq.Summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
			faq.Details.toLowerCase().includes(searchTerm.toLowerCase())
		const matchesCategory =
			activeCategory === 'all' || faq.category === activeCategory
		return matchesSearch && matchesCategory
	})

	return (
		<div className={rootStyles.wrapper}>
			<NavBar />

			<div className={rootStyles.Container}>
				<BurgerMenu />

				<main className={rootStyles.Main}>
					<ThemeProvider theme={theme}>
						<div className={styles.faqContainer}>
							<div className={styles.faqHeader}>
								<motion.h1
									className={styles.pageTitle}
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5 }}
								>
									Часті запитання
								</motion.h1>
								<motion.p
									className={styles.pageDescription}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.5, delay: 0.2 }}
								>
									Знайдіть відповіді на найбільш поширені питання про нашу
									фріланс платформу
								</motion.p>
							</div>

							<div className={styles.searchContainer}>
								<motion.div
									className={styles.searchBox}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.3 }}
								>
									<Search size={20} className={styles.searchIcon} />
									<input
										type='text'
										placeholder='Пошук питань...'
										value={searchTerm}
										onChange={e => setSearchTerm(e.target.value)}
										className={styles.searchInput}
									/>
								</motion.div>
							</div>

							<div className={styles.categoriesContainer}>
								<motion.div
									className={styles.categories}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.5, delay: 0.4 }}
								>
									{categories.map(category => (
										<button
											key={category.id}
											className={`${styles.categoryButton} ${
												activeCategory === category.id
													? styles.activeCategory
													: ''
											}`}
											onClick={() => setActiveCategory(category.id)}
										>
											{category.name}
										</button>
									))}
								</motion.div>
							</div>

							<motion.div
								className={styles.faqList}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ duration: 0.5, delay: 0.5 }}
							>
								{filteredFAQs.length > 0 ? (
									filteredFAQs.map((item, index) => (
										<Accordion
											key={index}
											className={styles.faqItem}
											elevation={0}
										>
											<AccordionSummary
												expandIcon={<ChevronUp />}
												className={styles.faqQuestion}
											>
												<HelpCircle size={20} className={styles.questionIcon} />
												<Typography className={styles.questionText}>
													{item.Summary}
												</Typography>
											</AccordionSummary>
											<AccordionDetails className={styles.faqAnswer}>
												<Typography>{item.Details}</Typography>
											</AccordionDetails>
										</Accordion>
									))
								) : (
									<div className={styles.noResults}>
										<p>
											За вашим запитом нічого не знайдено. Спробуйте змінити
											пошуковий запит або категорію.
										</p>
									</div>
								)}
							</motion.div>

							<div className={styles.contactSupport}>
								<p>Не знайшли відповіді на своє питання?</p>
								<button className={styles.supportButton}>
									Зв'язатися з підтримкою
								</button>
							</div>
						</div>
					</ThemeProvider>
				</main>
			</div>
			<Footer />
		</div>
	)
}

export default FAQ
