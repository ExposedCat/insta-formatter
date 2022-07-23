import fs from 'fs/promises'

async function createDirIfNotExists(path: string) {
	try {
		await fs.access(path)
	} catch {
		await fs.mkdir(path)
	}
}

export { createDirIfNotExists }
