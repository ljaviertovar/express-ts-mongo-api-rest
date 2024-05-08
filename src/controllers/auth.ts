import express from 'express'

import { createUser, getUserByEmail } from 'models/User'

import { authenticatiopn, random } from 'database/helpers'

export const register = async (req: express.Request, res: express.Response) => {
	try {
		const { username, email, password } = req.body

		if (!username || !email || !password) {
			return res.status(400).json({ error: 'Missing required fields' })
		}

		const existingUser = await getUserByEmail(email)
		if (existingUser) {
			return res.status(400).json({ error: 'User already exists' })
		}

		const salt = random()
		const newUser = await createUser({
			username,
			email,
			authentication: {
				password: authenticatiopn(password, salt),
				salt,
			},
		})

		return res.status(201).json(newUser).end()
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: error.message })
	}
}
