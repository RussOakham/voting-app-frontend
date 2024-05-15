import { ResourcesConfig } from 'aws-amplify'

const userPoolId = import.meta.env.VITE_AWS_USER_POOL_ID
const userPoolClientId = import.meta.env.VITE_AWS_USER_POOL_CLIENT_ID

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
