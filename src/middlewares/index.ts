import express from 'express'
import { get, merge } from 'lodash'

import { getUserBySessionToken } from '../models/User'

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {
		const sessionToken = req.cookies['AUTH_TOKEN']
		if (!sessionToken) {
			return res.sendStatus(401)
		}

		const existingUser = await getUserBySessionToken(sessionToken)
		if (!existingUser) {
			return res.sendStatus(401)
		}

		merge(req, { identity: existingUser })

		return next()
	} catch (error) {
		console.log(error)
		res.sendStatus(401)
	}
}

export const isOwner = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {
		const { id } = req.params
		const currentUser = get(req, 'identity._id') as string

		if (!currentUser || currentUser.toString() !== id) {
			return res.sendStatus(401)
		}

		return next()
	} catch (error) {
		console.log(error)
		res.sendStatus(401)
	}
}
