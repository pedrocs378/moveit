import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Cookies from 'js-cookie'

import { ModalContext } from './ModalContext'

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
	level: number
	currentExperience: number
	challengesCompleted: number

}

export const ChallengesContext = createContext<ChallengesContextData>({} as ChallengesContextData)

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
	const { showModal } = useContext(ModalContext)

	const [level, setLevel] = useState(rest.level ?? 1)
	const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
	const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)

	const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null)

	const experienceToNextLevel = useMemo(() => {
		return Math.pow((level + 1) * 4, 2)
	}, [level])

	useEffect(() => {
		Notification.requestPermission()
	}, [])

	useEffect(() => {
		Cookies.set('level', String(level))
		Cookies.set('currentExperience', String(currentExperience))
		Cookies.set('challengesCompleted', String(challengesCompleted))
	}, [level, currentExperience, challengesCompleted])

	const levelUp = useCallback(() => {
		const newExperience = activeChallenge.amount - (experienceToNextLevel - currentExperience)
		setLevel(level + 1)
		setCurrentExperience(newExperience)
		showModal({
			type: 'levelup',
			title: 'Parabéns',
			description: 'Você alcançou um novo level.',
			level: level + 1
		})
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
