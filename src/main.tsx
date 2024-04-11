import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Authenticator } from '@aws-amplify/ui-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Amplify } from 'aws-amplify'

import { amplifyConfig } from '@/lib/amplify/amplify'
import Root from '@/routes/root'

import { Shell } from './components/layouts/shells/shell'
import CreatePoll from './pages/create-poll/create-poll'
import Polls from './pages/polls/polls'

import '@aws-amplify/ui-react/styles.css'
import './index.css'

Amplify.configure(amplifyConfig)

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: Infinity,
		},
	},
})

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [
			{
				path: '/',
				element: <Polls />,
			},
			{
				path: 'create-poll',
				element: <CreatePoll />,
			},
		],
	},
])

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Shell variant="default" className="max-w-6xl">
				<Authenticator
					initialState="signIn"
					loginMechanism="email"
					signUpAttributes={['preferred_username']}
				>
					<RouterProvider router={router} />
				</Authenticator>
			</Shell>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</React.StrictMode>,
)
