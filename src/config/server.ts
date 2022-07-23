import express from 'express'

import { setHandlers, setMiddlewares } from '../helpers/index.js'

function initServer() {
	const app = express()

	setHandlers(app)
	setMiddlewares(app)

	return {
		server: app,
		runServer: (port: number) => app.listen(port)
	}
}

export { initServer }
