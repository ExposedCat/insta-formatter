import 'express'

interface Locals {
	image?: string
}

declare module 'express' {
	interface Response {
		locals: Locals
	}
}
