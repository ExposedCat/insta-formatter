import dotenv from 'dotenv'
import { resolvePath } from './index.js'

function validateEnv() {
	if (process.env.CONFIG) {
		dotenv.config({
			path: resolvePath(import.meta.url, `../../${process.env.CONFIG}`)
		})
	}
	const optionalEnvs = ['CONFIG']
	for (const env of optionalEnvs) {
		if (env in process.env) {
			continue
		}
		console.warn(
			`Warn: Optional environment variable "${env}" is not specified`
		)
	}
	const requiredEnvs = ['INPUT_DIR', 'OUTPUT_DIR']
	for (const env of requiredEnvs) {
		if (env in process.env) {
			continue
		}
		console.error(
			`Error: Required environment variable "${env}" is not specified`
		)
		process.exit(1)
	}
}

export { validateEnv }
