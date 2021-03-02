import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

import { UsersContext } from '../contexts/UsersContext'


export default function App() {
	const { user } = useContext(UsersContext)

	const router = useRouter()

	useEffect(() => {
		if (!user.githubId) {
			router.push('/login')
		} else {
			router.push('/home')
		}
	}, [user])

	return (
		<div></div>
	)
}
