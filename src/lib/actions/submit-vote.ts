import { SubmitVote } from '@/types/poll.type'

import { endpoints } from '../endpoints'

const { baseUrl, submitVote: submitVoteUrl } = endpoints

export const submitVote = async (data: SubmitVote) => {
	console.log('submitVote', data)
	try {
		const result = await fetch(`${baseUrl}${submitVoteUrl}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})

		if (!result.ok) {
			throw new Error('Error submitting vote')
		}

		return result
	} catch (err: unknown) {
		console.error(err)
		throw new Error(`Error submitting vote: ${JSON.stringify(err)}`)
	}
}
