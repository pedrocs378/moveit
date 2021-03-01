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
	const { username } = request.body

	try {
		const githubResponse = await githubApi.get(`/${username}`)

		const {
			id: githubId,
			avatar_url,
			name,
			login
		} = githubResponse.data

		const db = await connectToDatabase(process.env.MONGODB_URI)

		const collection = db.collection('users')

		const user = await collection.findOne({
			$where: function () {
				return this.githubId === githubId
			}
		})

		if (user) {
			return response.status(201).json({ user })
		}

		await collection.insertOne({
			githubId,
			avatar_url,
			name,
			login,
			createdAt: new Date()
		})

		return response.status(201).json({
			user: {
				githubId,
				avatar_url,
				name,
				login
			}
		})
	} catch {
		throw new Error('User not found')
	}

}
