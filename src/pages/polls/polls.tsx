import { useTransition } from 'react'
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
import { useToast } from '@/components/ui/use-toast'
import useGetCurrentUser from '@/lib/amplify/useGetCurrentUser'
import { useSubmitVoteMutation } from '@/lib/react-query/polls/mutations/useSubmitVoteMutation'
import { useGetPollsQuery } from '@/lib/react-query/polls/queries/useGetPollsQuery'

function Polls() {
	const [isPending, startTransition] = useTransition()
	const { toast } = useToast()
	const submitVoteMutation = useSubmitVoteMutation()
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

			{polls.map((option) => {
				return (
					<Card key={option.id} className="max-w-5xl">
						<CardHeader>
							<CardTitle>{polls[0]?.question}</CardTitle>
							<div className="flex justify-between">
								<CardDescription>
									Cast your vote by selecting an option below
								</CardDescription>
								<CardDescription>
									Total votes: {option.votes.length}
								</CardDescription>
							</div>
						</CardHeader>
						<CardContent className="flex flex-col gap-2">
							{option.options.map((answer) => {
								const optionVotes = option.votes.filter(
									(vote) => vote.option === answer.text,
								).length

								const percentage = (optionVotes / option.votes.length) * 100

								return (
									<Button
										key={answer.id}
										variant="vote"
										className="relative p-0"
										disabled={isPending}
										onClick={() => {
											startTransition(() => {
												submitVoteMutation.mutate(
													{
														pollId: option.id,
														votes: option.votes,
														submittedVote: {
															userId: user.userId,
															optionId: answer.id,
															optionText: answer.text,
														},
													},
													{
														onSuccess: () => {
															toast({
																title: 'Vote submitted',
																description: 'Your vote has been submitted',
															})
														},
														onError: () => {
															toast({
																title: 'Error submitting vote',
																description: `There was an error submitting your vote ${submitVoteMutation.error?.message ? `: ${submitVoteMutation.error.message}` : ''}`,
															})
														},
													},
												)
											})
										}}
									>
										<div
											className="pointer-events-none relative h-full rounded-md bg-purple-300 dark:bg-purple-600"
											style={{ width: `${percentage.toString()}%` }}
										/>
										<div className="pointer-events-none absolute inset-0 flex items-center justify-between p-2">
											{answer.text}
											<span>
												{`${optionVotes.toString()} votes - ${percentage.toFixed(0).toString()}%`}
											</span>
										</div>
									</Button>
								)
							})}
						</CardContent>
					</Card>
				)
			})}
		</Shell>
	)
}

export default Polls
