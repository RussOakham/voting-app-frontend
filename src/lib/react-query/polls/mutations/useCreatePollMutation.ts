import { useMutation } from '@tanstack/react-query'

import { createPoll } from '@/lib/actions/create-poll'
import { CreatePoll } from '@/utils/types/poll.type'

export const useCreatePollMutation = () => {
	return useMutation({
		mutationFn: async (data: CreatePoll) => {
			const response = await createPoll(data)

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
