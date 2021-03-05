import { createContext, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from 'js-cookie'
import axios from 'axios'

export interface User {
	githubId: number
	avatar_url: string
	name: string
	login: string
}

interface Challenge {
	level: number
	challengesCompleted: number
	currentExperience: number
}

interface UpdateUserProps {
	githubId: number
	challengeData: Challenge
}

interface UsersContextProps {
	user: User
	loading: boolean
	isErrored: boolean
	signIn: (username: string) => Promise<void>
	signOut: () => void
	updateUserChallenges: (userData: UpdateUserProps) => Promise<void>
}

interface UsersProviderProps {
	children: ReactNode
}

export const UsersContext = createContext<UsersContextProps>({} as UsersContextProps)

export function UsersProvider({ children }: UsersProviderProps) {
	const [user, setUser] = useState<User>({} as User)
	const [loading, setLoading] = useState(false)
	const [loadingUpdate, setLoadingUpdate] = useState(false)
	const [isErrored, setIsErrored] = useState(false)

	const router = useRouter()

	useEffect(() => {
		const data = Cookies.get('user')

		if (data) {
			const parsedData = JSON.parse(data)

			setUser(parsedData)
			router.push('/home')
		} else {
			setUser({} as User)
			router.push('/')
		}
	}, [])

	async function signIn(username: string) {
		try {
			setIsErrored(false)
			setLoading(true)

			if (!username.trim()) {
				throw new Error()
			}

			const response = await axios.post('/api/users', { username })

			Cookies.set('user', response.data.user)
			setUser(response.data.user)

			router.push('/home')
		} catch {
			setIsErrored(true)
		} finally {
			setLoading(false)
		}
	}

	async function updateUserChallenges({ githubId, challengeData }: UpdateUserProps) {
		try {
			setLoadingUpdate(true)
			console.log(githubId)
			const response = await axios.put('/api/users', {
				githubId,
				...challengeData
			})

			Cookies.set('user', response.data)
			setUser(response.data)
		} finally {
			setLoadingUpdate(false)
		}
	}

	function signOut() {
		Cookies.remove('user')
		setUser({} as User)

		router.push('/')
	}

	return (
		<UsersContext.Provider value={{
			user,
			loading,
			isErrored,
			signIn,
			signOut,
			updateUserChallenges,
		}}>
			{children}
		</UsersContext.Provider>
	)
}
