import Cookies from 'js-cookie'

import { axios } from '@/lib/axios/axios'
import { SubmitVote } from '@/utils/types/poll.type'

import { endpoints } from '../endpoints'

const { submitVote: submitVoteUrl } = endpoints

export const submitVote = async (data: SubmitVote) => {
	try {
		const token = Cookies.get('cognito-access-token')

		const response = await axios.post(submitVoteUrl, data, {
			headers: {
				Authorization: `Bearer ${token ?? ''}`,
			},
		})

		return response
	} catch (err: unknown) {
		if (err instanceof Error) {
			throw err
		}
		throw new Error('[submit-vote]: Unknown error')
	}
}
