import React from 'react'
import styles from '../../../../styles/shared/layout/root.module.css'
import BurgerMenu from '../../../shared/components/BurgerMenu'
import { UkrainianWar } from '../../../user/components/UserExpirience/BlockSaveUkraine'
import Footer from '../../../user/components/UserExpirience/Footer'
import NavBar from '../../../user/components/UserExpirience/NavBar'

import { useState } from 'react'
import { MySearch } from '../../../shared/components/Search'
import NewsAside from '../../components/News/NewsAside'
import NewsList from '../../components/News/NewsList'

export function News() {
	const [value, Setvalue] = useState('') // Стан для зберігання значення пошуку

	// Оновлюєм значення із MySearch
	const handleValueChange = value => {
		Setvalue(value)
	}
	return (
		<>
			<div className={styles.wrapper}>
				<NavBar />
				<UkrainianWar />
				<MySearch onChange={handleValueChange} />
				<div className={styles.Container}>
					<BurgerMenu />

					<main
						className={styles.Main}
						style={{ paddingLeft: '90px', marginRight: '28px' }}
					>
						<div className='font-bold mb-3 text-lg'>Новини кіберспорту</div>
						{/*
							<div className='flex font-medium'>
							<span className='w-px h-5 bg-gray-400 mr-4'></span>
							<Link className='mr-4'>CS2</Link>
							<span className='w-px h-5 bg-gray-400 mr-4'></span>
							<Link className='mr-4'>Dota 2</Link>
							<span className='w-px h-5 bg-gray-400 mr-4'></span>
							<Link className='mr-4'>EA Sports FC</Link>
							<span className='w-px h-5 bg-gray-400 mr-4'></span>
							<Link className='mr-4'> Інші новини</Link>
						</div>
						 до краших часів) */}

						{/* News block*/}
						<NewsList value={value} />
					</main>
					<aside className='w-[25%]'>
						<NewsAside
							url={'http://localhost:4000/api/news/news_last'}
							title={'Останні новини'}
						/>
						<NewsAside
							title={'Найцікавіші новини'}
							url={'http://localhost:4000/api/news/news_pop'}
						/>
					</aside>
				</div>
				<Footer />
			</div>
		</>
	)
}
