import {
	ResponseName,
	ImageDimesnsion,
	ServiceResponse
} from '../types/index.js'

import Image from 'sharp'
import { v4 as generateUUID } from 'uuid'

import { createDirIfNotExists, resolvePath } from '../helpers/index.js'

function calcNewImageDimensions(
	width: number,
	height: number,
	ratioX: number,
	ratioY: number,
	minimal = true
): ImageDimesnsion {
	let length = width
	let parts = ratioX
	if ((minimal && height < length) || height >= length) {
		length = height
		parts = ratioY
	}
	const partLength = length / parts
	const newWidth = ratioX * partLength
	const newHeight = ratioY * partLength
	const gaps = {
		horizontal: ((newWidth - width) / 2) | 0,
		vertical: ((newHeight - height) / 2) | 0
	}
	if (gaps.vertical < 0 || gaps.horizontal < 0) {
		if (!minimal) {
			console.error(`Error: Calculated gap is negative`)
			process.exit(1)
		}
		return calcNewImageDimensions(width, height, ratioX, ratioY, false)
	}
	return {
		image: {
			width: newWidth | 0,
			height: newHeight | 0
		},
		gaps
	}
}

enum AspectRatios {
	Standard = 'Standard',
	Portrait = 'Portrait',
	Landscape = 'Landscape'
}

function getNewImageDimensions(width: number, height: number) {
	const aspectRatio = width / height
	const standard = Math.abs(aspectRatio - 1 / 1)
	const portrait = Math.abs(aspectRatio - 4 / 5)
	const landscape = Math.abs(aspectRatio - 1.91 / 1)

	const calculate = calcNewImageDimensions.bind(null, width, height)
	let newDimensions: ImageDimesnsion
	let aspectRatioName = AspectRatios.Landscape
	if (standard < portrait && standard < landscape) {
		newDimensions = calculate(1, 1)
		aspectRatioName = AspectRatios.Standard
	} else if (portrait < standard && portrait < landscape) {
		newDimensions = calculate(3, 4)
		aspectRatioName = AspectRatios.Portrait
	} else {
		newDimensions = calculate(1.91, 1)
	}
	return {
		dimensions: newDimensions,
		aspectRatio: aspectRatioName
	}
}

async function formatImage(inputFilePath: string): Promise<ServiceResponse> {
	let image: Image.Sharp
	let metadata: Image.Metadata
	try {
		image = Image(inputFilePath)
		metadata = await image.metadata()
		if (!metadata.width || !metadata.height) {
			throw ''
		}
	} catch (error) {
		return {
			isError: true,
			data: {
				errorMessage: ResponseName.InvalidInput
			}
		}
	}
	const imageData = getNewImageDimensions(metadata.width, metadata.height)
	const { dominant } = await image.stats()
	const canvas = Image({
		create: {
			width: imageData.dimensions.image.width,
			height: imageData.dimensions.image.height,
			channels: 4,
			background: dominant
		}
	})
	const imageContents = await image.toBuffer()
	const result = canvas.composite([
		{
			input: imageContents,
			gravity: Image.gravity.center
		}
	])
	const outputFile = generateUUID()
	const resultPath = resolvePath(
		import.meta.url,
		`../../${process.env.OUTPUT_DIR}`
	)
	const resultFile = `${resultPath}/${outputFile}.png`
	try {
		await createDirIfNotExists(resultPath)
		await result.toFile(resultFile)
		return {
			isError: false,
			data: {
				image: resultFile
			}
		}
	} catch {
		return {
			isError: true,
			data: {
				errorMessage: ResponseName.Unknown
			}
		}
	}
}

export { formatImage }
