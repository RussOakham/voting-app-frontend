import { useQuery } from '@tanstack/react-query'

import { getPollById } from '@/lib/actions/get-poll-by-id'
import { zodParse } from '@/utils/helpers/zodParse'
import { Poll, pollSchema } from '@/utils/types/poll.type'

export const useGetPollByIdQuery = (pollId: string, initialData: Poll) => {
	const query = useQuery({
		queryKey: ['poll', pollId],
		initialData,
		queryFn: async (): Promise<Poll> => {
			const response = await getPollById(pollId)

			if ('error' in response) {
				throw new Error(response.error)
			}

			const { data: poll } = response

			return zodParse(pollSchema, poll)
		},
	})

	return query
}
