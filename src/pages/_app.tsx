import '../styles/global.css'

import { AppProvider } from '../contexts'
import { Modal } from '../components/Modal'

function MyApp({ Component, pageProps }) {
	return (
		<AppProvider>
			<Component {...pageProps} />
			{/* <Modal /> */}
		</AppProvider>
	)
}

export default MyApp
