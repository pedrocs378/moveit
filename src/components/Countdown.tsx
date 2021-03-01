import { useContext, useMemo } from 'react'
import { FiX } from 'react-icons/fi'
import { FaCheckCircle, FaPlay } from 'react-icons/fa'

import { CountdownContext } from '../contexts/CountdownContext'

import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
	const {
		hasFinished,
		isActive,
		minutes,
		seconds,
		resetCountdown,
		startCountdown
	} = useContext(CountdownContext)

	const [minuteLeft, minuteRight] = useMemo(() => {
		return String(minutes).padStart(2, '0').split('')
	}, [minutes])

	const [secondsLeft, secondsRight] = useMemo(() => {
		return String(seconds).padStart(2, '0').split('')
	}, [seconds])

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

			{ hasFinished ? (
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
									<FaPlay size={18} color="var(--white)" />
								</button>
							)
						}
					</>
				)}
		</div>
	)
}
