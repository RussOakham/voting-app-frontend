import { useTransition } from 'react'
import { AuthUser } from 'aws-amplify/auth'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { useSubmitVoteMutation } from '@/lib/react-query/polls/mutations/useSubmitVoteMutation'
import { useGetPollByIdQuery } from '@/lib/react-query/polls/queries/useGetPollByIdQuery'
import { Poll } from '@/utils/types/poll.type'

interface PollCardProps {
	initialPollData: Poll
	user: AuthUser
}

const PollCard = ({ initialPollData, user }: PollCardProps) => {
	const [isPending, startTransition] = useTransition()
	const { toast } = useToast()
	const submitVoteMutation = useSubmitVoteMutation()
	const {
		data: poll,
		isError,
		error,
	} = useGetPollByIdQuery(initialPollData.id, initialPollData)

	if (isError) {
		return <p>Error: {error.message}</p>
	}

	const userHasVoted = poll.votes.some((vote) => vote.user === user.userId)

	return (
		<Card key={poll.id} className="max-w-5xl">
			<CardHeader>
				<CardTitle>{poll.question}</CardTitle>
				<div className="flex justify-between">
					<CardDescription>
						Cast your vote by selecting an option below
					</CardDescription>
					<CardDescription>Total votes: {poll.votes.length}</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				{poll.options.map((answer) => {
					const optionVotes = poll.votes.filter(
						(vote) => vote.option === answer.text,
					).length

					const percentage = (optionVotes / poll.votes.length) * 100

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
											pollId: poll.id,
											votes: poll.votes,
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
				{userHasVoted ? (
					<span className="text-center text-sm text-muted-foreground">
						You have already voted on this poll
					</span>
				) : null}
			</CardContent>
		</Card>
	)
}

export default PollCard
