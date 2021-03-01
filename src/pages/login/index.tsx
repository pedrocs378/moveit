import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'

import styles from '../../styles/pages/Login.module.css'

export default function Login() {
	const [username, setUsername] = useState('')
	const [isFilled, setIsFilled] = useState(false)

	const router = useRouter()

	useEffect(() => {
		if (username.trim()) {
			setIsFilled(true)
		} else {
			setIsFilled(false)
		}
	}, [username])

	function handleSubmit(event: FormEvent) {
		event.preventDefault()

		router.push('/home')
	}

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

				<form className={styles.inputContainer} onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Digite seu username"
						value={username}
						onChange={(event) => setUsername(event.target.value)}
					/>
					<button
						type="submit"
						style={{
							backgroundColor: isFilled ? 'var(--green)' : 'var(--blue-dark)'
						}}
					>
						<FiArrowRight size={25} color="var(--white)" />
					</button>
				</form>
			</div>
		</div>
	)
}
