import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { fromZodError, ValidationError, ZodError } from 'zod-validation-error'

import { endpoints } from '@/lib/endpoints'
import { GetPolls, getPollsSchema, Poll } from '@/types/poll.type'

const { baseUrl, getPolls } = endpoints

const zodParse = <T extends z.ZodTypeAny>(
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

export const useGetPollsQuery = () => {
	const query = useQuery({
		queryKey: ['polls'],
		queryFn: async (): Promise<Poll[]> => {
			const response = await fetch(`${baseUrl}${getPolls}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			if (!response.ok) {
				throw new Error(`Error fetching polls: ${response.statusText}`)
			}

			const data = (await response.json()) as Promise<GetPolls>

			return zodParse(getPollsSchema, data).Items
		},
	})

	return query
}
