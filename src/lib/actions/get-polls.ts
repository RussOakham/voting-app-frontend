import axiosOrigin from 'axios'
import Cookies from 'js-cookie'

import { axios } from '@/lib/axios/axios'
import { endpoints } from '@/lib/endpoints'
import { GetPolls } from '@/utils/types/poll.type'

const { getPolls: GetPollsUrl } = endpoints

export const getPolls = async () => {
	try {
		const token = Cookies.get('cognito-access-token')

		const response = await axios.get<GetPolls>(GetPollsUrl, {
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
