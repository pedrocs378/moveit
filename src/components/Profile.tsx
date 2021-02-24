import { useContext } from 'react'

import { ChallengesContext } from '../contexts/ChallengesContext'

import styles from '../styles/components/Profile.module.css'

export function Profile() {
	const { level } = useContext(ChallengesContext)

	return (
		<div className={styles.profileContainer}>
			<img src="https://github.com/pedrocs378.png" alt="Pedro César" />
			<div>
				<strong>Pedro César</strong>
				<p>
					<img src="icons/level.svg" alt="Level" />
					Level {level}
				</p>
			</div>
		</div>
	)
}
