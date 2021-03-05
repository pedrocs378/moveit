import { GetServerSideProps } from 'next'
import Head from 'next/head'

import { ChallengeBox } from '../../components/ChallengeBox'
import { CompletedChallenges } from '../../components/CompletedChallenges'
import { Countdown } from '../../components/Countdown'
import { ExperienceBar } from '../../components/ExpirenceBar'
import { Profile } from '../../components/Profile'

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

			</div>
		</ChallengesProvider>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { user } = context.req.cookies

	if (user) {
		const parsedUser = JSON.parse(user)

		return {
			props: {
				level: parsedUser.challenges?.level || null,
				currentExperience: parsedUser.challenges?.currentExperience || null,
				challengesCompleted: parsedUser.challenges?.challengesCompleted || null
			}
		}
	}
}
