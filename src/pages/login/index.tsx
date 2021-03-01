import { FormEvent, useEffect, useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { BiErrorCircle } from 'react-icons/bi'
import ReactLoading from 'react-loading'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios'

import styles from '../../styles/pages/Login.module.css'

export default function Login() {
	const [username, setUsername] = useState('')
	const [loading, setLoading] = useState(false)
	const [isFilled, setIsFilled] = useState(false)
	const [isErrored, setIsErrored] = useState(false)

	const router = useRouter()

	useEffect(() => {
		if (username.trim()) {
			setIsFilled(true)
		} else {
			setIsFilled(false)
		}
	}, [username])

	async function handleSubmit(event: FormEvent) {
		event.preventDefault()

		try {
			setLoading(true)

			const response = await axios.post('/api/users/signin', { username })

			console.log(response.data)
			// router.push('/home')
		} catch {
			setIsErrored(true)
		} finally {
			setLoading(false)
		}
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

				<form onSubmit={handleSubmit}>
					<div className={styles.inputContainer}>
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
							{loading ? (
								<ReactLoading
									type="bubbles"
									color="var(--white)"
									height={30}
									width={30}
								/>
							) : (
									<FiArrowRight size={25} color="var(--white)" />
								)
							}
						</button>
					</div>
					{isErrored && (
						<p>
							<BiErrorCircle />
							Usuário não encontrado, tente novamente.
						</p>
					)}
				</form>
			</div>
		</div>
	)
}
