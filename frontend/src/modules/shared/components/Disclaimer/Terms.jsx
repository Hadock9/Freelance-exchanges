import { Box, Button, Container, Paper, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { motion } from 'framer-motion'
import React from 'react'
// import styles from '../../../styles/shared/pages/Terms.module.css' // Файл Terms.module.css відсутній, тому імпорт закоментовано

const theme = createTheme({
	palette: {
		primary: {
			main: '#f7c94f',
		},
	},
	typography: {
		h2: {
			fontSize: '2.5rem',
			fontWeight: 600,
			marginBottom: '1.5rem',
			color: '#333',
		},
		body1: {
			fontSize: '1rem',
			lineHeight: 1.7,
			marginBottom: '1rem',
			color: '#555',
		},
	},
})

export function Terms({ setReadTerms }) {
	const handleReadTerms = () => {
		setReadTerms(false)
	}
	return (
		<ThemeProvider theme={theme}>
			<Container maxWidth='lg' className={styles.Container}>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Paper elevation={3} className={styles.Block}>
						<Box p={4}>
							<section>
								<Typography variant='h2' align='center' gutterBottom>
									Умови використання платформи
								</Typography>

								<Typography variant='body1'>
									Ласкаво просимо до нашої фріланс-платформи. Використовуючи
									наші послуги, ви погоджуєтесь з наступними умовами. Платформа
									є посередником між замовниками та фрілансерами, забезпечуючи
									безпечне та ефективне середовище для співпраці. Ми збираємо та
									обробляємо персональні дані користувачів для забезпечення
									якісного сервісу та безпеки транзакцій.
								</Typography>
								<Typography variant='body1'>
									Реєструючись на платформі, ви підтверджуєте, що вам
									виповнилося 18 років і ви маєте право укладати юридично
									зобов'язуючі договори. Ви погоджуєтесь надавати точну та
									актуальну інформацію про себе. Платформа використовує систему
									безпечних платежів (ескроу) для захисту обох сторін під час
									виконання проектів.
								</Typography>
								<Typography variant='body1'>
									Всі транзакції проходять через нашу платформу, а комісія
									становить 10% від суми проекту. Платформа зберігає право на
									блокування облікових записів у разі порушення правил
									користування або підозрілої активності.
								</Typography>
							</section>

							<section>
								<Typography variant='h2' align='center' gutterBottom>
									Правила роботи на платформі
								</Typography>

								<Typography variant='body1'>
									1. Загальні положення для всіх користувачів:
								</Typography>
								<ul>
									<li>
										Заборонено використовувати платформу для незаконної
										dіяльності
									</li>
									<li>
										Вся комунікація між замовником та виконавцем має відбуватися
										через платформу
									</li>
									<li>
										Заборонено обмінюватися контактними даними до укладення
										договору
									</li>
									<li>
										Користувачі несуть відповідальність за конфіденційність
										своїх облікових даних
									</li>
								</ul>
								<Typography variant='body1'>
									2. Правила для фрілансерів:
								</Typography>
								<ul>
									<li>
										Виконавці зобов'язуються дотримуватися термінів виконання
										проектів
									</li>
									<li>Портфоліо має містити лише власні роботи</li>
									<li>
										Заборонено передавати проекти третім особам без згоди
										замовника
									</li>
									<li>
										Необхідно підтримувати професійну комунікацію з клієнтами
									</li>
								</ul>
								<Typography variant='body1'>
									3. Правила для замовників:
								</Typography>
								<ul>
									<li>Надавати чіткі та повні технічні завдання</li>
									<li>Своєчасно оплачувати виконану роботу</li>
									<li>
										Не вимагати роботи, не передбаченої початковим технічним
										завданням
									</li>
									<li>Поважати інтелектуальну власність виконавців</li>
								</ul>
							</section>

							<section>
								<Typography variant='h2' align='center' gutterBottom>
									Вирішення спорів
								</Typography>

								<Typography variant='body1'>
									У разі виникнення спорів між замовником та виконавцем,
									платформа надає послуги медіації. Наша служба підтримки
									розглядає кожен випадок індивідуально та приймає рішення на
									основі наданих доказів обома сторонами.
								</Typography>
								<Typography variant='body1'>
									Якщо виникає спір щодо якості виконаної роботи, платформа може
									залучити незалежних експертів для оцінки. Рішення платформи є
									остаточним та обов'язковим для виконання обома сторонами.
								</Typography>
								<Typography variant='body1'>
									У випадку порушення умов користування платформою, ми залишаємо
									за собою право призупинити або повністю припинити надання
									послуг користувачу без попередження та пояснення причин.
								</Typography>
							</section>

							<Box display='flex' justifyContent='flex-end' mt={4}>
								<Button
									variant='contained'
									color='primary'
									onClick={handleReadTerms}
									sx={{
										minWidth: 200,
										py: 1,
										color: 'white',
										'&:hover': {
											backgroundColor: '#e5b73c',
										},
									}}
								>
									Повернутися до реєстрації
								</Button>
							</Box>
						</Box>
					</Paper>
				</motion.div>
			</Container>
		</ThemeProvider>
	)
}
