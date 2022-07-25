import 'express'

interface Locals {
	image?: string | null
}

declare module 'express' {
	interface Response {
		locals: Locals
	}
}
