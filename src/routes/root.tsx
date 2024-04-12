import { Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

import MainNav from '@/components/layouts/navigation/main-nav'
import { Toaster } from '@/components/ui/toaster'
import useGetCurrentSession from '@/lib/amplify/useGetCurrentSession'
import useGetCurrentUser from '@/lib/amplify/useGetCurrentUser'
import useReactQuerySubscription from '@/lib/react-query/useReactQuerySubscription'

function Root() {
	useReactQuerySubscription()
	const user = useGetCurrentUser()
	const session = useGetCurrentSession()

	if (session !== null) {
		Cookies.set(
			'cognito-access-token',
			session.tokens?.accessToken.toString() ?? '',
			{
				expires: 7,
			},
		)
	}

	if (!user?.userId) {
		return <div>Not authenticated...</div>
	}

	return (
		<>
			<MainNav />
			<h1 className="text-center text-lg font-bold">
				Welcome to the voting app
			</h1>
			<span className="text-md text-center font-bold">
				{user.signInDetails?.loginId}
			</span>
			<Outlet />
			<Toaster />
		</>
	)
}

export default Root
