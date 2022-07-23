import express, { Express } from 'express'
import helmet, { HelmetOptions } from 'helmet'

function setMiddlewares(app: Express) {
	// Security headers
	const helmetOptions = {
		referrerPolicy: 'strict-origin-when-cross-origin'
	} as HelmetOptions
	app.use(helmet(helmetOptions))

	// Express config
	app.use(express.json())
	app.use(
		express.urlencoded({
			extended: true
		})
	)
}

export { setMiddlewares }
