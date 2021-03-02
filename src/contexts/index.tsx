import { ReactNode } from "react";

import { ModalProvider } from "./ModalContext";
import { UsersProvider } from "./UsersContext";

interface AppProviderProps {
	children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {

	return (
		<ModalProvider>
			<UsersProvider>
				{children}
			</UsersProvider>
		</ModalProvider>
	)
}
