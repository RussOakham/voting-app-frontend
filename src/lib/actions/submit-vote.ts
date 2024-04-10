import { SubmitVote } from '@/types/poll.type'

import { endpoints } from '../endpoints'

const { baseUrl, submitVote: submitVoteUrl } = endpoints

export const submitVote = async (data: SubmitVote) => {
	try {
		const response = await fetch(`${baseUrl}${submitVoteUrl}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})

		if (!response.ok) {
			interface ErrorResponse {
				message: string
			}

			const error = await response.text().then((text) => text)
			const jsonError = JSON.parse(error) as ErrorResponse

			return await Promise.reject(new Error(jsonError.message))
		}

		return response
	} catch (err: unknown) {
		if (err instanceof Error) {
			throw err
		}
		throw new Error('[submit-vote]: Unknown error')
	}
}
