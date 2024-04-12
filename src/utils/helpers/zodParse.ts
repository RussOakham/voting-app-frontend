import { z } from 'zod'
import { fromZodError, ValidationError, ZodError } from 'zod-validation-error'

export const zodParse = <T extends z.ZodTypeAny>(
	schema: T,
	data: unknown,
): z.infer<T> => {
	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return schema.parse(data)
	} catch (error: unknown) {
		const zodError: ValidationError = fromZodError(error as ZodError)
		throw new Error(
			`${zodError.toString()}, Response data: ${JSON.stringify(data)}`,
		)
	}
}
