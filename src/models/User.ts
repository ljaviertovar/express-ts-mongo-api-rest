import mongoose, { model, Model } from 'mongoose'

import { User as UserType } from '../types'

const UserSchema = new mongoose.Schema<UserType>({
	username: { type: String, required: true },
	email: { type: String, required: true },
	authentication: {
		password: { type: String, required: true, select: false },
		salt: { type: String, select: false },
		sessionToken: { type: String, select: false },
	},
})

export const User: Model<UserType> = mongoose.models.User || model('User', UserSchema)

export const getUsers = () => User.find()
export const getUserByEmail = (email: string) => User.findOne({ email })
export const getUserBySessionToken = (sessionToken: string) =>
	User.findOne({ 'authentication.sessionToken': sessionToken })
export const getUserById = (id: string) => User.findById(id)
export const createUser = (values: Record<string, any>) => new User(values).save().then(user => user.toObject())
export const delteUser = (id: string) => User.findByIdAndDelete({ _id: id })
export const updateUser = (id: string, values: Record<string, any>) =>
	User.findOneAndUpdate({ _id: id }, values, { new: true })
