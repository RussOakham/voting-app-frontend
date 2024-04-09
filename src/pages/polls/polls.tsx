import { LuPlusCircle } from 'react-icons/lu'
import { Link } from 'react-router-dom'

import { Shell } from '@/components/layouts/shells/shell'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { useGetPollsQuery } from '@/lib/react-query/polls/useGetPollsQuery'

function Polls() {
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

	return (
		<Shell variant="default" className="max-w-6xl">
			<h2 className="text-md font-bold">Add New Poll</h2>

			<Button variant="secondary" asChild>
				<Link to="/create-poll">
					<LuPlusCircle size={20} />
					<span className="sr-only">Add Poll</span>
				</Link>
			</Button>

			{polls.map((option) => {
				return (
					<Card key={option.id} className="max-w-5xl">
						<CardHeader>
							<CardTitle>{polls[0]?.question}</CardTitle>
							<CardDescription>
								Cast your vote by selecting an option below
							</CardDescription>
						</CardHeader>
						<CardContent className="flex flex-col gap-2">
							{option.options.map((answer) => (
								<Button
									key={answer.id}
									variant="vote"
									className="relative bg-gradient-to-r from-purple-300 from-50% to-slate-200 to-50%"
								>
									{answer.text}
									<span className="pointer-events-none absolute right-3">
										25 - 50%
									</span>
								</Button>
							))}
						</CardContent>
					</Card>
				)
			})}
		</Shell>
	)
}

export default Polls
