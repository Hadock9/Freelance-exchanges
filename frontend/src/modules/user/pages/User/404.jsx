import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../../../../styles/User/404.module.css'

export function Erorpage() {
	return (
		<div className={styles.Container}>
			<div className={styles.ContainerBlock}>
				<h1 className={styles.ContainerBlockText}>404</h1>
				<p className={styles.ContainerBlockText}>Page not found</p>
				<p className={styles.ContainerBlockText}>
					Your search has ventured beyond the known universe.
				</p>

				<Link to='/Home'>
					<div className={styles.GoBack}>Go back to Home </div>
				</Link>
			</div>
		</div>
	)
}
