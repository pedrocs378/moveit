import '../styles/global.css'
import { useRouter } from 'next/router'

import { SideBar } from '../components/SideBar'

import { AppProvider } from '../contexts'

import styles from '../styles/pages/App.module.css'
import { useMemo } from 'react'

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
