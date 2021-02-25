import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'

import challenges from '../../challenges.json'

interface Challenge {
	type: 'body' | 'eye'
	description: string
	amount: number
}

interface ChallengesContextData {
	level: number
	experienceToNextLevel: number
	currentExperience: number
	challengesCompleted: number
	levelUp: () => void
	startNewChallenge: () => void
	completeChallenge: () => void
	resetChallenge: () => void
	activeChallenge: Challenge
}

interface ChallengesProviderProps {
	children: ReactNode
}

export const ChallengesContext = createContext<ChallengesContextData>({} as ChallengesContextData)

export function ChallengesProvider({ children }: ChallengesProviderProps) {
	const [level, setLevel] = useState(1)
	const [currentExperience, setCurrentExperience] = useState(0)
	const [challengesCompleted, setChallengesCompleted] = useState(0)

	const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null)

	const experienceToNextLevel = useMemo(() => {
		return Math.pow((level + 1) * 4, 2)
	}, [level])

	useEffect(() => {
		Notification.requestPermission()
	}, [])

	const levelUp = useCallback(() => {
		const newExperience = activeChallenge.amount - (experienceToNextLevel - currentExperience)
		setLevel(level + 1)
		setCurrentExperience(newExperience)
	}, [activeChallenge, experienceToNextLevel, currentExperience])

	const startNewChallenge = useCallback(() => {
		const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
		const challenge = challenges[randomChallengeIndex] as Challenge

		setActiveChallenge(challenge)

		new Audio('/notification.mp3').play()

		if (Notification.permission === 'granted') {
			new Notification('Novo desafio 🎉', {
				body: `Valendo ${challenge.amount}xp!`
			})
		}
	}, [])

	function resetChallenge() {
		setActiveChallenge(null)
	}

	function completeChallenge() {
		if (!activeChallenge) {
			return
		}

		const nextExperience = currentExperience + activeChallenge.amount

		if (nextExperience >= experienceToNextLevel) {
			levelUp()
		} else {
			setCurrentExperience(nextExperience)
		}

		setChallengesCompleted(challengesCompleted + 1)
		setActiveChallenge(null)
	}

	return (
		<ChallengesContext.Provider
			value={{
				level,
				experienceToNextLevel,
				currentExperience,
				challengesCompleted,
				levelUp,
				startNewChallenge,
				resetChallenge,
				completeChallenge,
				activeChallenge,
			}}
		>
			{children}
		</ChallengesContext.Provider>
	)
}
