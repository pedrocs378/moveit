import { useContext, useEffect, useMemo, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { FaCheckCircle } from 'react-icons/fa'

import { ChallengesContext } from '../contexts/ChallengesContext'

import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout

export function Countdown() {
	const { activeChallenge, startNewChallenge } = useContext(ChallengesContext)

	const [time, setTime] = useState(0.1 * 60)
	const [isActive, setIsActive] = useState(false)
	const [hasFinished, setHasFinished] = useState(false)

	const minutes = useMemo(() => {
		return Math.floor(time / 60)
	}, [time])

	const seconds = useMemo(() => {
		return time % 60
	}, [time])

	const [minuteLeft, minuteRight] = useMemo(() => {
		return String(minutes).padStart(2, '0').split('')
	}, [minutes])

	const [secondsLeft, secondsRight] = useMemo(() => {
		return String(seconds).padStart(2, '0').split('')
	}, [seconds])

	function startCountdown() {
		setIsActive(true)
	}

	function resetCountdown() {
		clearTimeout(countdownTimeout)
		setIsActive(false)
		setTime(0.1 * 60)
	}

	useEffect(() => {
		if (isActive && time > 0) {
			countdownTimeout = setTimeout(() => {
				setTime(time - 1)
			}, 1000)
		}

		if (isActive && time === 0) {
			setHasFinished(true)
			setIsActive(false)
			startNewChallenge()
		}
	}, [isActive, time])

	useEffect(() => {
		if (!activeChallenge) {
			resetCountdown()
		}
	}, [activeChallenge])

	return (
		<div>
			<div className={styles.countdownContainer}>
				<div>
					<span>{minuteLeft}</span>
					<span>{minuteRight}</span>
				</div>
				<span>:</span>
				<div>
					<span>{secondsLeft}</span>
					<span>{secondsRight}</span>
				</div>
			</div>

			{ (hasFinished && activeChallenge) ? (
				<button
					disabled
					className={`${styles.countdownButton}`}
				>
					Ciclo encerrado
					<FaCheckCircle size={20} color="var(--green)" />
				</button>
			) : (
					<>
						{ isActive ? (
							<button
								type='button'
								className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
								onClick={resetCountdown}
							>
								Abandonar ciclo
								<FiX size={24} />
							</button>
						) : (
								<button
									type='button'
									className={`${styles.countdownButton}`}
									onClick={startCountdown}
								>
									Iniciar um ciclo
								</button>
							)
						}
					</>
				)}
		</div>
	)
}
