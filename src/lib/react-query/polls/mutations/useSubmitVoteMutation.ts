import { useMutation } from '@tanstack/react-query'

import { submitVote } from '@/lib/actions/submit-vote'
import { SubmitVote } from '@/utils/types/poll.type'

export const useSubmitVoteMutation = () => {
	return useMutation({
		mutationFn: async (data: SubmitVote) => {
			const response = await submitVote(data)

			if ('error' in response) {
				throw new Error(response.error)
			}

			return response
		},
		onError: (error) => {
			return error
		},
	})
}
