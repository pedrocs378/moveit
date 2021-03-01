import Head from 'next/head'
import { useContext } from 'react'

import { ChallengesContext } from '../../contexts/ChallengesContext'

import styles from '../../styles/pages/Leaderboard.module.css'

export default function Leaderboard() {
	const { level } = useContext(ChallengesContext)

	return (
		<div className={styles.leaderboardContainer}>
			<Head>
				<title>Leaderboard | move.it</title>
			</Head>

			<h1>Leaderboard</h1>

			<div className={styles.gridContainer}>
				<div className={styles.gridTitles}>
					<th>Posição</th>
					<th>Usuário</th>
					<th>Desafios</th>
					<th>Experiência</th>
				</div>
				<div className={styles.gridUserRow}>
					<td>1</td>
					<td>
						<img src="https://github.com/pedrocs378.png" alt="Pedro César" />
						<div>
							<strong>Pedro César</strong>
							<p>
								<img src="icons/level.svg" alt="Level" />
								Level 43
							</p>
						</div>
					</td>
					<td><span>127</span> completados</td>
					<td><span>154000</span> xp</td>
				</div>
			</div>
		</div>
	)
}
