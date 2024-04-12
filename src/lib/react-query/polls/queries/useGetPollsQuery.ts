import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import { axios } from '@/lib/axios/axios'
import { endpoints } from '@/lib/endpoints'
import { zodParse } from '@/utils/helpers/zodParse'
import { GetPolls, Poll, pollSchema } from '@/utils/types/poll.type'

const { getPolls } = endpoints

export const useGetPollsQuery = () => {
	const query = useQuery({
		queryKey: ['polls'],
		queryFn: async (): Promise<Poll[]> => {
			const token = Cookies.get('cognito-access-token')

			const response = await axios.get<GetPolls>(getPolls, {
				headers: {
					Authorization: `Bearer ${token ?? ''}`,
				},
			})

			const polls = response.data.Items

			if (polls.length === 0) {
				throw new Error('Error fetching polls')
			}

			return zodParse(pollSchema.array(), polls)
		},
	})

	return query
}
