import Head from 'next/head'
import { InputUsername } from '../components/InputUsername'

import styles from '../styles/pages/Login.module.css'

export default function App() {

	return (
		<div className={styles.loginContainer}>
			<Head>
				<title>move.it</title>
			</Head>

			<div className={styles.columnLogo}>
				<img src="/simbolo.svg" alt="Simbolo" />
			</div>
			<div className={styles.columnSignIn}>
				<img src="/white-logo-full.svg" alt="Logo" />
				<h2>Bem-vindo</h2>
				<div>
					<img src="/icons/github.svg" alt="Github" />
					<p>Faça login com seu Github para começar</p>
				</div>

				<InputUsername
					placeholder="Digite seu username"
				/>
			</div>
		</div>
	)
}
