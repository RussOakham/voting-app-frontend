/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ResourcesConfig } from 'aws-amplify'

const userPoolId = import.meta.env.VITE_AWS_USER_POOL_ID as string
const userPoolClientId = import.meta.env.VITE_AWS_USER_POOL_CLIENT_ID as string

export const amplifyConfig: ResourcesConfig = {
	Auth: {
		Cognito: {
			userPoolId,
			userPoolClientId,
			loginWith: {
				username: false,
				email: true,
			},
			userAttributes: {
				preferred_username: {
					required: true,
				},
			},
		},
	},
}
