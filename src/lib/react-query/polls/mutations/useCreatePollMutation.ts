import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createPoll } from '@/lib/actions/create-poll'
import { CreatePoll } from '@/utils/types/poll.type'

export const useCreatePollMutation = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (data: CreatePoll) => {
			await createPoll(data)
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['polls'],
			})
		},
	})
}
