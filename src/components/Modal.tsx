
import { useContext } from 'react'

import { ModalMessage, ModalContext } from '../contexts/ModalContext'

import styles from '../styles/components/Modal.module.css'

interface ModalProps {
	message: ModalMessage
	isVisible: boolean
}

export function Modal({ message, isVisible }: ModalProps) {
	const { closeModal } = useContext(ModalContext)

	return (
		<>
			{isVisible && (
				<div className={styles.modalContainer}>
					<div className={styles.modal}>
						<button type="button" onClick={closeModal}>
							<img src="/icons/close.svg" alt="Close" />
						</button>
						{message.type === 'levelup' && (
							<div className={styles.levelContainer}>
								<span>{message.level}</span>
								<img src="/icons/levelup.svg" alt="LevelUp" />
							</div>
						)}
						<h1>{message.title}</h1>
						<p>{message.description}</p>
						{message.type === 'levelup' && (
							<button type="button">
								Compartilhar no twitter
								<img src="/icons/twitter.svg" alt="Twitter" />
							</button>
						)}
					</div>
				</div>
			)}
		</>
	)
}
