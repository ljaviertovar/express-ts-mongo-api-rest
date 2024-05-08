export type User = {
	username: string
	email: string
	authenticacion: Auth
	createdAt?: string
	updatedAt?: string
}

export type Auth = {
	password: string
	salt: string
	sessionToken: string
}
