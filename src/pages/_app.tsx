import '../styles/global.css'

import { useMemo } from 'react'
import { useRouter } from 'next/router'

import { SideBar } from '../components/SideBar'

import { AppProvider } from '../contexts'

import styles from '../styles/pages/App.module.css'

function MyApp({ Component, pageProps }) {
	const router = useRouter()

	const route = useMemo(() => {
		return router.route.replace('/', '')
	}, [router.route])

	if (route === 'login') {
		return (
			<AppProvider>
				<Component {...pageProps} />
			</AppProvider>
		)
	}

	return (
		<AppProvider>
			<div className={styles.container}>
				<SideBar />
				<Component {...pageProps} />
			</div>
		</AppProvider>
	)
}

export default MyApp
