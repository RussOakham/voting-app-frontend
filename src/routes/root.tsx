import { Outlet } from 'react-router-dom'

import MainNav from '@/components/layouts/navigation/main-nav'
import { Toaster } from '@/components/ui/toaster'
import useGetCurrentUser from '@/lib/amplify/useGetCurrentUser'
import useReactQuerySubscription from '@/lib/react-query/useReactQuerySubscription'

function Root() {
	useReactQuerySubscription()
	const user = useGetCurrentUser()

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
