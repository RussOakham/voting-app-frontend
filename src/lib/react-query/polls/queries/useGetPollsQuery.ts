import { useQuery } from '@tanstack/react-query'

import { getPolls } from '@/lib/actions/get-polls'
import { zodParse } from '@/utils/helpers/zodParse'
import { Poll, pollSchema } from '@/utils/types/poll.type'

export const useGetPollsQuery = () => {
	const query = useQuery({
		queryKey: ['polls'],
		queryFn: async (): Promise<Poll[]> => {
			const response = await getPolls()

			if ('error' in response) {
				throw new Error(response.error)
			}

			const polls = response.data.Items

			if (polls.length === 0) {
				throw new Error('No polls found')
			}

			return zodParse(pollSchema.array(), polls)
		},
	})

	return query
}
