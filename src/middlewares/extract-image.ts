import fs from 'fs'
import { Request, Response, NextFunction } from 'express'

import { saveImage } from '../services/index.js'

async function extractImage(req: Request, res: Response, next: NextFunction) {
	try {
		const inputFilePath = await saveImage(req as unknown as fs.ReadStream)
		res.locals.image = inputFilePath
	} catch {
		res.locals.image = null
	}
	next()
}

export { extractImage }
