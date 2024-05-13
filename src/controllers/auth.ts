import express from 'express'

import { createUser, getUserByEmail } from '../models/User'

import { authentication, random } from '../helpers'

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
				salt,
				password: authentication(salt, password),
			},
		})

		return res.status(201).json(newUser).end()
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: error.message })
	}
}

export const login = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password } = req.body

		if (!email || !password) {
			return res.status(400).json({ error: 'Missing required fields' })
		}

		const user = await getUserByEmail(email).select('+authentication.password +authentication.salt')
		if (!user) {
			return res.status(400).json({ error: 'User not found' })
		}

		if (user.authentication.password !== authentication(user.authentication.salt, password)) {
			return res.status(403).json({ error: 'Incorrect password' })
		}

		// Generate a new session token
		const salt = random()
		user.authentication.sessionToken = authentication(salt, user._id.toString())

		await user.save()

		// Set the session token as a cookie
		res.cookie('AUTH_TOKEN', user.authentication.sessionToken, {
			domain: 'localhost',
			path: '/',
		})

		return res.status(200).json(user).end()
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error: error.message })
	}
}
