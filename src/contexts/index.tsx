import { ReactNode } from "react";
import { ChallengesProvider } from "./ChallengesContext";
import { CountdownProvider } from "./CountdownContext";
import { ModalProvider } from "./ModalContext";

interface AppProviderProps {
	children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {

	return (
		<ModalProvider>
			<ChallengesProvider>
				{children}
			</ChallengesProvider>
		</ModalProvider>
	)
}
