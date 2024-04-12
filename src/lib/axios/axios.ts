import axiosOriginal from 'axios'

import { endpoints } from '../endpoints'

const { baseUrl } = endpoints

export const axios = axiosOriginal.create({
	baseURL: baseUrl,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
	},
})
