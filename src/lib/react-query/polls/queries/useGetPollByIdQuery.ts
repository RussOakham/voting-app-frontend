import { useQuery } from '@tanstack/react-query'

import { endpoints } from '@/lib/endpoints'
import { zodParse } from '@/utils/helpers/zodParse'
import { Poll, pollSchema } from '@/utils/types/poll.type'

const { baseUrl, getPolls } = endpoints

export const useGetPollByIdQuery = (pollId: string, initialData: Poll) => {
	const query = useQuery({
		queryKey: ['poll', pollId],
		initialData,
		queryFn: async (): Promise<Poll> => {
			const response = await fetch(`${baseUrl}${getPolls}/${pollId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			})

			if (!response.ok) {
				throw new Error(`Error fetching poll: ${response.statusText}`)
			}

			const data = (await response.json()) as Promise<Poll>

			return zodParse(pollSchema, data)
		},
	})

	return query
}
