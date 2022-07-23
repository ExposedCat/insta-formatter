import { initServer } from './index.js'
import { validateEnv } from '../helpers/index.js'

async function initApp() {
	validateEnv() // Will raise an error

	return initServer()
}

export { initApp }
