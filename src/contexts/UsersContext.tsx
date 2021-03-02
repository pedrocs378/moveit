import { createContext, ReactNode, useEffect, useState } from "react";
import axios from 'axios'
import { useRouter } from "next/router";
import Cookies from 'js-cookie'

export interface User {
	githubId: number
	avatar_url: string
	name: string
	login: string
}

interface UsersContextProps {
	user: User
	loading: boolean
	isErrored: boolean
	signIn: (username: string) => Promise<void>
	signOut: () => void
}

interface UsersProviderProps {
	children: ReactNode
}

export const UsersContext = createContext<UsersContextProps>({} as UsersContextProps)

export function UsersProvider({ children }: UsersProviderProps) {
	const [user, setUser] = useState<User>({} as User)
	const [loading, setLoading] = useState(false)
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

			const response = await axios.post('/api/users/signin', { username })

			Cookies.set('user', response.data.user)
			setUser(response.data.user)

			router.push('/home')
		} catch {
			setIsErrored(true)
		} finally {
			setLoading(false)
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
			signOut
		}}>
			{children}
		</UsersContext.Provider>
	)
}
