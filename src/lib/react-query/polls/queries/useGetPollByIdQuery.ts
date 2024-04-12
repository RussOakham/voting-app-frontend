import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import { axios } from '@/lib/axios/axios'
import { endpoints } from '@/lib/endpoints'
import { zodParse } from '@/utils/helpers/zodParse'
import { Poll, pollSchema } from '@/utils/types/poll.type'

const { getPolls } = endpoints

export const useGetPollByIdQuery = (pollId: string, initialData: Poll) => {
	const query = useQuery({
		queryKey: ['poll', pollId],
		initialData,
		queryFn: async (): Promise<Poll> => {
			const token = Cookies.get('cognito-access-token')

			const response = await axios.get<Poll>(`${getPolls}/${pollId}`, {
				headers: {
					Authorization: `Bearer ${token ?? ''}`,
				},
			})

			const { data: poll } = response

			return zodParse(pollSchema, poll)
		},
	})

	return query
}
