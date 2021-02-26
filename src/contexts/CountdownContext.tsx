import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { ChallengesContext } from './ChallengesContext'

interface CountdownContextData {
	minutes: number
	seconds: number
	hasFinished: boolean
	isActive: boolean
	startCountdown: () => void
	resetCountdown: () => void
}

interface CountdownProviderProps {
	children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout

export function CountdownProvider({ children }: CountdownProviderProps) {
	const { startNewChallenge } = useContext(ChallengesContext)

	const [time, setTime] = useState(25 * 60)
	const [isActive, setIsActive] = useState(false)
	const [hasFinished, setHasFinished] = useState(false)

	const minutes = useMemo(() => {
		return Math.floor(time / 60)
	}, [time])

	const seconds = useMemo(() => {
		return time % 60
	}, [time])

	function startCountdown() {
		setIsActive(true)
	}

	function resetCountdown() {
		clearTimeout(countdownTimeout)
		setIsActive(false)
		setHasFinished(false)
		setTime(25 * 60)
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

	return (
		<CountdownContext.Provider value={{
			minutes,
			seconds,
			hasFinished,
			isActive,
			startCountdown,
			resetCountdown,
		}}>
			{children}
		</CountdownContext.Provider>
	)
}
