import { createContext, ReactNode, useState } from "react";

import { Modal } from "../components/Modal";

export interface ModalMessage {
	type: 'levelup'
	title: string
	description: string
	level?: number
}

interface ModalContextData {
	showModal: (msg: ModalMessage) => void
	closeModal: () => void
}

interface ModalProviderProps {
	children: ReactNode
}

export const ModalContext = createContext<ModalContextData>({} as ModalContextData)

export function ModalProvider({ children }: ModalProviderProps) {
	const [message, setMessage] = useState<ModalMessage>()
	const [isVisible, setIsVisible] = useState(false)

	function showModal(msg: ModalMessage) {
		setMessage(msg)
		setIsVisible(true)
	}

	function closeModal() {
		setIsVisible(false)
		setMessage({} as ModalMessage)
	}

	return (
		<ModalContext.Provider value={{ showModal, closeModal }}>
			{children}
			<Modal message={message} isVisible={isVisible} />
		</ModalContext.Provider>
	)
}
