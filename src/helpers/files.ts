import fs from 'fs/promises'

async function createDirIfNotExists(path: string) {
	try {
		await fs.access(path)
	} catch {
		await fs.mkdir(path)
	}
}

async function deleteFile(path: string) {
	try {
		await fs.unlink(path)
	} catch (error) {
		console.warn(`Can't unlink file:`)
		console.warn(error)
	}
}

export { createDirIfNotExists, deleteFile }
