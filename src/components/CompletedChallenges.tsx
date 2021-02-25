import { useContext, useMemo } from 'react'

import { ChallengesContext } from '../contexts/ChallengesContext'

import styles from '../styles/components/CompleteChallenges.module.css'

export function CompletedChallenges() {
	const { challengesCompleted } = useContext(ChallengesContext)

	const challengesCompletedParsed = useMemo(() => {
		return String(challengesCompleted).padStart(2, '0')
	}, [challengesCompleted])

	return (
		<div className={styles.completedChallengesContainer}>
			<span>Desafios completos</span>
			<span>{challengesCompletedParsed}</span>
		</div>
	)
}
