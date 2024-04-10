import { CreatePoll as CreatePollType } from '@/types/poll.type'

import { endpoints } from '../endpoints'

const { baseUrl, createPoll: createPollUrl } = endpoints

export const createPoll = async (data: CreatePollType) => {
	try {
		const result = await fetch(`${baseUrl}${createPollUrl}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})

		if (!result.ok) {
			throw new Error('Error creating poll')
		}

		return result
	} catch (err: unknown) {
		console.error(err)
		throw new Error(`Error creating poll: ${JSON.stringify(err)}`)
	}
}
