import { NowRequest, NowResponse } from '@vercel/node'
import { MongoClient, Db } from 'mongodb'
import { URL } from 'url'

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

	if (request.method === 'GET') {
		const collection = db.collection('users')

		const users = await collection.find().toArray()

		const sortedUsers = users.sort((a, b) => b.challenges.level - a.challenges.level)

		return response.json(sortedUsers)
	} else {
		return response.status(400).send('Bad request')
	}

}
