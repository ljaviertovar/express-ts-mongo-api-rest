import express from 'express'

import { getUsers, delteUserById, updateUserById } from '../models/User'

export const getAllUsers = async (_req: express.Request, res: express.Response) => {
	try {
		const users = await getUsers()
		return res.status(200).json(users).end()
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: error.message })
	}
}

export const delteUser = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params
		const deletedUser = await delteUserById(id)
		return res.status(200).json(deletedUser).end()
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: error.message })
	}
}

export const updateUser = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params
		const { username } = req.body

		if (!username) return res.status(400).json({ error: 'Missing required fields' })

		const updatedUser = await updateUserById(id, { username })

		return res.status(200).json(updatedUser).end()
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: error.message })
	}
}
