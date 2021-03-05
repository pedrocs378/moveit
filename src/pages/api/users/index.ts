import { NowRequest, NowResponse } from '@vercel/node'
import { MongoClient, Db } from 'mongodb'
import { URL } from 'url'

import { githubApi } from '../../../services/githubApi'

let cachedDb: Db = null

async function connectToDatabase(uri: string) {
	if (cachedDb) {
		return cachedDb
	}

	const client = await MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})

	const dbName = new URL(uri).pathname.substr(1)

	const db = client.db(dbName)

	cachedDb = db

	return db
}

export default async (request: NowRequest, response: NowResponse) => {
	const db = await connectToDatabase(process.env.MONGODB_URI)

	if (request.method === 'POST') {
		const { username } = request.body

		try {
			const collection = db.collection('users')

			const user = await collection.findOne({
				"login": username,
			})

			if (user) {
				return response.status(201).json({ user })
			}

			const githubResponse = await githubApi.get(`/${username}`)

			const {
				id: githubId,
				avatar_url,
				name,
				login
			} = githubResponse.data

			const newUser = {
				githubId,
				avatar_url,
				name,
				login,
				challenges: {
					level: 1,
					currentExperience: 0,
					challengesCompleted: 0
				},
				createdAt: new Date()
			}

			await collection.insertOne(newUser)

			return response.status(201).json({
				user: newUser
			})
		} catch (err) {
			throw new Error(err)
		}
	} else if (request.method === 'PUT') {
		const {
			githubId,
			level,
			challengesCompleted,
			currentExperience
		} = request.body

		try {
			const collection = db.collection('users')

			const user = await collection.findOne({
				"githubId": githubId,
			})

			if (!user) {
				throw new Error('User not found')
			}

			const updateData = {
				challenges: {
					level,
					challengesCompleted,
					currentExperience,
				},
				updatedAt: new Date()
			}

			await collection.updateOne({
				"githubId": githubId,
			}, {
				$set: updateData
			})

			return response.json({
				...user,
				...updateData
			})

		} catch (err) {
			return response.status(400).send(err)
		}

	} else {
		return response.status(400).send('Bad request')
	}

}
