import { z } from 'zod'

export const metadataSchema = z.object({
	attempts: z.number(),
	httpStatusCode: z.number(),
	requestId: z.string(),
	totalRetryDelay: z.number(),
})
