import Link from 'next/link'
import { useState } from 'react';
import { FiAward, FiHome } from "react-icons/fi";

import styles from '../styles/components/SideBar.module.css'

interface CurrentRouteProps {
	name: 'home' | 'leaderboard'
}

export function SideBar() {
	const [currentRoute, setCurrentRoute] = useState<CurrentRouteProps>({
		name: 'home'
	})

	return (
		<aside className={styles.sideBarContainer}>
			<img src="/icons/logo.svg" alt="Logo" />
			<div>
				<button
					className={currentRoute.name === 'home' && styles.currentRoute}
					onClick={() => setCurrentRoute({ name: 'home' })}
				>
					<Link href="/home">
						<FiHome size={32} />
					</Link>
				</button>
				<button
					className={currentRoute.name === 'leaderboard' && styles.currentRoute}
					onClick={() => setCurrentRoute({ name: 'leaderboard' })}
				>
					<Link href="/home">
						<FiAward size={32} />
					</Link>
				</button>
			</div>
			<div />
		</aside>
	)
}
