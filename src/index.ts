import { validateEnv } from './helpers/index.js'
import { formatImage } from './services/index.js'

validateEnv()
await formatImage('1.png')
