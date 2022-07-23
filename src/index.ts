import { initServer } from './config/index.js'
import { validateEnv } from './helpers/index.js'

validateEnv() // Will fail on error

const { runServer } = initServer()
runServer(Number(process.env.PORT))
