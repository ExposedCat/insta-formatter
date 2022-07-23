declare global {
	namespace NodeJS {
		interface ProcessEnv {
			INPUT_DIR: string
			OUTPUT_DIR: string
			PORT: string
			CONFIG?: string
		}
	}
}
