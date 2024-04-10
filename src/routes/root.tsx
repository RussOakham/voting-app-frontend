import { Outlet } from 'react-router-dom'

import { Shell } from '@/components/layouts/shells/shell'
import { Toaster } from '@/components/ui/toaster'

function Root() {
	return (
		<Shell variant="default" className="max-w-6xl">
			<h1 className="text-center text-lg font-bold">
				Welcome to the voting app
			</h1>
			<Outlet />
			<Toaster />
		</Shell>
	)
}

export default Root
