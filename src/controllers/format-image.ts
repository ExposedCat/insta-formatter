import {
	ResultType,
	HandlerData,
	HandlerType,
	BasicHandler,
	ResponseName
} from '../types/index.js'

import { extractImage } from '../middlewares/index.js'
import { deleteFile } from '../helpers/index.js'
import { formatImage, respond } from '../services/index.js'

const handler: BasicHandler = async (req, res, next) => {
	if (res.locals.image) {
		const { isError, data } = await formatImage(res.locals.image)
		if (isError) {
			respond(res, ResultType.Error, data.errorMessage)
			return
		}
		const cleanup = async (source: string) => {
			await deleteFile(data.image)
			await deleteFile(source)
		}
		res.status(200).sendFile(
			data.image,
			cleanup.bind(null, res.locals.image)
		)
	} else {
		respond(res, ResultType.Error, ResponseName.InvalidInput)
	}
}

const data: HandlerData = {
	method: HandlerType.Post,
	path: '/api/format-image',
	handler,
	validations: [extractImage]
}

export { data }
