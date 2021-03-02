import { useContext, useEffect } from 'react'

import { ChallengesContext } from '../contexts/ChallengesContext'
import { UsersContext } from '../contexts/UsersContext'

import styles from '../styles/components/Profile.module.css'

export function Profile() {
	const { level } = useContext(ChallengesContext)
	const { user } = useContext(UsersContext)

	return (
		<div className={styles.profileContainer}>
			<img src={user.avatar_url} alt={user.name} />
			<div>
				<strong>{user.name}</strong>
				<p>
					<img src="icons/level.svg" alt="Level" />
					Level {level}
				</p>
			</div>
		</div>
	)
}
