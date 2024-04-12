import { useQuery } from '@tanstack/react-query'

import { endpoints } from '@/lib/endpoints'
import { zodParse } from '@/utils/helpers/zodParse'
import { GetPolls, getPollsSchema, Poll } from '@/utils/types/poll.type'

const { baseUrl, getPolls } = endpoints

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
