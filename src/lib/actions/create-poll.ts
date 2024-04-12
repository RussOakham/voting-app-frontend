import axiosOrigin from 'axios'
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
		if (axiosOrigin.isAxiosError(err)) {
			return {
				error: err.message,
				status: err.response?.status ?? 500,
			}
		}

		return {
			error: 'An error occurred',
			status: 500,
		}
	}
}
