import Link from 'next/link'
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { FiAward, FiHome, FiPower } from "react-icons/fi";
import { UsersContext } from '../contexts/UsersContext';

import styles from '../styles/components/SideBar.module.css'

type CurrentRouteProps = 'home' | 'leaderboard'

export function SideBar() {
	const { signOut } = useContext(UsersContext)

	const [currentRoute, setCurrentRoute] = useState<CurrentRouteProps>('home')

	const router = useRouter()

	useEffect(() => {
		const route = router.route.replace('/', '')

		if (route === 'home' || route === 'leaderboard') {
			setCurrentRoute(route)
		} else {
			setCurrentRoute('home')
		}
	}, [router.route])

	return (
		<aside className={styles.sideBarContainer}>
			<img src="/icons/logo.svg" alt="Logo" />
			<ul>
				<li>
					<Link href="/home">
						<a
							className={currentRoute === 'home' ? styles.currentRoute : ''}
							onClick={() => setCurrentRoute('home')}
						>

							<FiHome size={32} />
						</a>
					</Link>
				</li>
				<li>
					<Link href="/leaderboard">
						<a
							className={currentRoute === 'leaderboard' ? styles.currentRoute : ''}
							onClick={() => setCurrentRoute('leaderboard')}
						>
							<FiAward size={32} />
						</a>
					</Link>
				</li>
			</ul>
			<button type="button" onClick={signOut}>
				<FiPower color="#000" />
			</button>
		</aside>
	)
}
