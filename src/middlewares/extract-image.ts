import fs from 'fs'
import { v4 as generateUUID } from 'uuid'
import { Request, Response, NextFunction } from 'express'

import { resolvePath } from '../helpers/index.js'

async function extractImage(req: Request, res: Response, next: NextFunction) {
	const fileName = generateUUID()
	const inputFilePath = resolvePath(
		import.meta.url,
		`../../${process.env.INPUT_DIR}/${fileName}.png`
	)
	const stream = fs.createWriteStream(inputFilePath)
	stream.once('finish', () => {
		res.locals.image = inputFilePath
		next()
	})
	req.pipe(stream)
}

export { extractImage }
