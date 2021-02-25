import { ReactNode } from "react";
import { ChallengesProvider } from "./ChallengesContext";
import { CountdownProvider } from "./CountdownContext";

interface AppProviderProps {
	children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {

	return (
		<ChallengesProvider>
			{children}
		</ChallengesProvider>
	)
}
