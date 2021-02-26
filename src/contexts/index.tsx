import { ReactNode } from "react";

import { ModalProvider } from "./ModalContext";

interface AppProviderProps {
	children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {

	return (
		<ModalProvider>
			{children}
		</ModalProvider>
	)
}
