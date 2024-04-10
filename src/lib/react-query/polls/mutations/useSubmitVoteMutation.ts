import { useMutation, useQueryClient } from '@tanstack/react-query'

import { submitVote } from '@/lib/actions/submit-vote'
import { Poll, SubmitVote } from '@/types/poll.type'

export const useSubmitVoteMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (data: SubmitVote) => {
			const polls = queryClient.getQueryData<Poll[]>(['polls'])

			const poll = polls?.find((p) => p.id === data.id)

			if (!poll) {
				throw new Error('Could not find poll')
			}

			await submitVote(data)
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['polls'],
			})
		},
	})
}
