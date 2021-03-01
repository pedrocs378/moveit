import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { FiHome, FiAward } from 'react-icons/fi'

import { ChallengeBox } from '../../components/ChallengeBox'
import { CompletedChallenges } from '../../components/CompletedChallenges'
import { Countdown } from '../../components/Countdown'
import { ExperienceBar } from '../../components/ExpirenceBar'
import { Profile } from '../../components/Profile'
import { SideBar } from '../../components/SideBar'
import { ChallengesProvider } from '../../contexts/ChallengesContext'
import { CountdownProvider } from '../../contexts/CountdownContext'

import styles from '../../styles/pages/Home.module.css'

interface HomeProps {
	level: number
	currentExperience: number
	challengesCompleted: number
}

export default function Home(props: HomeProps) {

	return (
		<ChallengesProvider
			level={props.level}
			currentExperience={props.currentExperience}
			challengesCompleted={props.challengesCompleted}
		>
			<div className={styles.container}>
				<SideBar />

				<main>
					<Head>
						<title>Início | move.it</title>
					</Head>

					<ExperienceBar />

					<CountdownProvider>
						<section>
							<div>
								<Profile />
								<CompletedChallenges />
								<Countdown />
							</div>
							<div>
								<ChallengeBox />
							</div>
						</section>
					</CountdownProvider>
				</main>
			</div>
		</ChallengesProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { level, currentExperience, challengesCompleted } = context.req.cookies

	return {
		props: {
			level: Number(level),
			currentExperience: Number(currentExperience),
			challengesCompleted: Number(challengesCompleted)
		}
	}
}
