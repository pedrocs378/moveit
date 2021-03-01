import { InputHTMLAttributes } from 'react'
import { FiArrowRight } from 'react-icons/fi'

import styles from '../styles/components/InputUsername.module.css'

export function InputUsername({ ...rest }: InputHTMLAttributes<HTMLInputElement>) {

	return (
		<form className={styles.inputContainer}>
			<input type="text" {...rest} />
			<button>
				<FiArrowRight size={25} color="var(--white)" />
			</button>
		</form>
	)
}
