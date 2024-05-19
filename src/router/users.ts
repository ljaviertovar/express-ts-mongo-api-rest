import express from 'express'

import { delteUser, getAllUsers, updateUser } from '../controllers/users'
import { isAuthenticated, isOwner } from '../middlewares'

export default (router: express.Router) => {
	router.get('/users', isAuthenticated, getAllUsers)
	router.delete('/users/:id', isAuthenticated, isOwner, delteUser)
	router.patch('/users/:id', isAuthenticated, isOwner, updateUser)
}
