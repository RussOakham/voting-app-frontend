import Cookies from 'js-cookie'

import { axios } from '@/lib/axios/axios'
import { CreatePoll as CreatePollType } from '@/utils/types/poll.type'

import { endpoints } from '../endpoints'

const { createPoll: createPollUrl } = endpoints

export const createPoll = async (data: CreatePollType) => {
	try {
		const token = Cookies.get('cognito-access-token')

		const response = await axios.post(createPollUrl, data, {
			headers: {
				Authorization: `Bearer ${token ?? ''}`,
			},
		})

		return response
	} catch (err: unknown) {
		throw new Error(`Error creating poll: ${JSON.stringify(err)}`)
	}
}
