import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import dotenv from 'dotenv'

import { db } from './database'
import router from './router'

dotenv.config()

const app = express()

app.use(
	cors({
		credentials: true,
	})
)

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(3000, () => {
	console.log('Server is running on port 3000')
})

try {
	db.connect()
} catch (error) {
	console.error(error)
}

app.use('/', router())
