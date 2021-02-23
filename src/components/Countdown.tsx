import { useEffect, useMemo, useState } from 'react'
import { FiX } from 'react-icons/fi'

import styles from '../styles/components/Countdown.module.css'

export function Countdown() {
	const [time, setTime] = useState(2 * 60)
	const [active, setActive] = useState(false)

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
		if (active) {
			setActive(false)

			return
		}

		setActive(true)
	}

	useEffect(() => {
		if (active && time > 0) {
			setTimeout(() => {
				setTime(time - 1)
			}, 1000)
		}

		if (!active) {
			setTime(2 * 60)
		}

		if (time === 0) {
			setActive(false)
		}
	}, [active, time])

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

			<button
				type='button'
				className={`${styles.countdownButton} ${active ? styles.countdownButtonDisabled : styles.countdownButtonEnabled}`}
				onClick={startCountdown}
			>
				{active ? 'Abandonar ciclo' : 'Iniciar um ciclo'}
				{active && (
					<FiX size={24} />
				)}
			</button>
		</div>
	)
}
