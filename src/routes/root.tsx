import { Outlet } from 'react-router-dom'
import { Authenticator } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify'
import {} from 'aws-amplify/auth'

import { Shell } from '@/components/layouts/shells/shell'
import { Toaster } from '@/components/ui/toaster'
import { amplifyConfig } from '@/lib/amplify/amplify'

import '@aws-amplify/ui-react/styles.css'

Amplify.configure(amplifyConfig)

function Root() {
	return (
		<Shell variant="default" className="max-w-6xl">
			<h1 className="text-center text-lg font-bold">
				Welcome to the voting app
			</h1>
			<Authenticator
				initialState="signUp"
				loginMechanism="email"
				signUpAttributes={['preferred_username']}
			>
				{({ user }) => {
					if (user) {
						return (
							<>
								<div className="text-center">
									<p>Welcome, {user.signInDetails?.loginId}</p>
								</div>
								<Outlet />
							</>
						)
					}

					return <div>Loading...</div>
				}}
			</Authenticator>
			<Toaster />
		</Shell>
	)
}

export default Root
