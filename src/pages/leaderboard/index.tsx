import { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import Head from 'next/head'
import axios from 'axios'

import styles from '../../styles/pages/Leaderboard.module.css'

interface UserChallenge {
	level: number
	challengesCompleted: number
	currentExperience: number
}

interface User {
	_id: string
	avatar_url: string
	name: string
	challenges: UserChallenge
}

export default function Leaderboard() {
	const [loading, setLoading] = useState(false)
	const [usersLeaderboard, setUsersLeaderboard] = useState<User[]>([])

	useEffect(() => {
		setLoading(true)

		axios
			.get('/api/users/leaderboard/level')
			.then(response => {
				setUsersLeaderboard(response.data)
			})
			.finally(() => setLoading(false))
	}, [])

	return (
		<div className={styles.leaderboardContainer}>
			<Head>
				<title>Leaderboard | move.it</title>
			</Head>

			<h1>Leaderboard</h1>

			<div className={styles.gridContainer}>
				<div className={styles.gridTitles}>
					<p className={styles.gridTitleColumn}>Posição</p>
					<p className={styles.gridTitleColumn}>Usuário</p>
					<p className={styles.gridTitleColumn}>Desafios</p>
					<p className={styles.gridTitleColumn}>Experiência</p>
				</div>

				{loading && (
					<div style={{
						height: '20rem',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center'
					}}>
						<ReactLoading
							type="spinningBubbles"
							color="var(--blue-dark)"
							height={50}
							width={50}
						/>
					</div>
				)}

				{usersLeaderboard && usersLeaderboard.map((user, index) => {
					return (
						<div key={user._id} className={styles.gridUserRow}>
							<div className={styles.gridUserColumn}>{index + 1}</div>
							<div className={styles.gridUserColumn}>
								<img src={user.avatar_url} alt={user.name} />
								<div>
									<strong>{user.name}</strong>
									<p>
										<img src="icons/level.svg" alt="Level" />
										Level {user.challenges.level}
									</p>
								</div>
							</div>
							<div className={styles.gridUserColumn}>
								<span>{user.challenges.challengesCompleted}</span> completados
							</div>
							<div className={styles.gridUserColumn}>
								<span>{user.challenges.currentExperience}</span> xp
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

