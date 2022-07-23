import { ResponseName } from './index.js'

interface ServiceResponseError {
	isError: true
	data: {
		errorMessage: ResponseName
	}
}

interface ServiceResponseDataImage {
	image: string
}

interface ServiceResponseSuccess {
	isError: false
	data: ServiceResponseDataImage
}

type ServiceResponse = ServiceResponseSuccess | ServiceResponseError

export { ServiceResponse }
