import { LuPlusCircle } from 'react-icons/lu'
import { Link } from 'react-router-dom'

import { Shell } from '@/components/layouts/shells/shell'
import { Button } from '@/components/ui/button'
import useGetCurrentUser from '@/lib/amplify/useGetCurrentUser'
import { useGetPollsQuery } from '@/lib/react-query/polls/queries/useGetPollsQuery'

import PollCard from './components/poll-card'

// TODO: More Granular data controls
// Refactor each poll card into its own component
// Pass each poll item to component and feed into react query cache as initial data
// On vote - emit socket event for individual poll and invalidate cache for that poll

function Polls() {
	const user = useGetCurrentUser()
	const {
		data: polls,
		isError,
		isPending: isPollsPending,
		error,
	} = useGetPollsQuery()

	if (isPollsPending) {
		return <p>Loading...</p>
	}

	if (isError) {
		return <p>Error: {error.message}</p>
	}

	if (!user?.userId) {
		return <p>Not authenticated</p>
	}

	return (
		<Shell variant="default" className="max-w-6xl">
			<h2 className="text-md font-bold">Add New Poll</h2>

			<Button variant="secondary" asChild>
				<Link to="/create-poll">
					<LuPlusCircle size={20} />
					<span className="sr-only">Add Poll</span>
				</Link>
			</Button>

			{polls.map((poll) => {
				return <PollCard key={poll.id} initialPollData={poll} user={user} />
			})}
		</Shell>
	)
}

export default Polls
