import { ReadStream, createWriteStream } from 'fs'
import { v4 as generateUUID } from 'uuid'

import { resolvePath } from '../helpers/index.js'

async function saveImage(outStream: ReadStream): Promise<string> {
	const fileName = generateUUID()
	const inputFilePath = resolvePath(
		import.meta.url,
		`../../${process.env.INPUT_DIR}/${fileName}.png`
	)
	const stream = createWriteStream(inputFilePath)
	return new Promise((resolve, reject) => {
		stream.once('finish', () => {
			resolve(inputFilePath)
		})
		try {
			outStream.pipe(stream)
		} catch (error) {
			reject(error)
		}
	})
}

export { saveImage }
