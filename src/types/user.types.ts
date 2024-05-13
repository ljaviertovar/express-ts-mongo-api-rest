export type User = {
	username: string
	email: string
	authentication: Auth
	createdAt?: string
	updatedAt?: string
}

export type Auth = {
	password: string
	salt: string
	sessionToken: string
}
