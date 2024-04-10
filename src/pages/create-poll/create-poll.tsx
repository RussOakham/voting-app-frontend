import { useTransition } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { LuMinusCircle, LuPlusCircle } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { v4 as uuid } from 'uuid'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useCreatePollMutation } from '@/lib/react-query/polls/mutations/useCreatePollMutation'
import {
	CreatePoll as CreatePollType,
	createPollSchema,
} from '@/types/poll.type'

const isDev = import.meta.env.MODE === 'development'

const CreatePoll: React.FC = () => {
	const [isPending, startTransition] = useTransition()
	const navigate = useNavigate()
	const createPollMutation = useCreatePollMutation()

	const id1 = uuid()
	const id2 = uuid()

	const form = useForm<CreatePollType>({
		resolver: zodResolver(createPollSchema),
		defaultValues: {
			question: '',
			options: [
				{ id: id1, text: '' },
				{ id: id2, text: '' },
			],
			votes: [],
			createdBy: 'user-1',
		},
	})
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'options',
	})

	const onSubmit = (data: CreatePollType) => {
		startTransition(() => {
			createPollMutation.mutate(data, {
				onError: (error) => {
					console.error(error)
				},
			})
			navigate('/polls')
		})
	}

	const addOption = () => {
		const id = uuid()
		append({ id, text: '' })
	}

	const removeOption = (index: number) => {
		if (fields.length <= 2) {
			return
		}

		remove(index)
	}

	return (
		<Card className="max-w-5xl">
			<CardHeader>
				<CardTitle>Create a new poll</CardTitle>
				<CardDescription>
					Create a poll below by entering a question and up to 5 optional
					answers
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-2">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
						<div className="flex w-full flex-col items-center gap-4">
							<FormField
								control={form.control}
								name="question"
								render={({ field }) => (
									<FormItem className="relative w-full max-w-4xl space-y-1">
										<FormLabel className="text-md">Question</FormLabel>
										<FormControl>
											<Input
												placeholder="What would you like to ask?"
												className="pr-12"
												autoComplete="off"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{fields.map((option, index) => {
								return (
									<FormField
										key={option.id}
										control={form.control}
										// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
										name={`options.${index}.text` as const}
										render={({ field }) => (
											<FormItem className="relative w-full max-w-4xl space-y-1">
												<FormLabel className="text-md">{`Option ${(index + 1).toString()}`}</FormLabel>
												<FormControl>
													<div className="flex">
														<Input
															id={option.id}
															placeholder={`Option ${(index + 1).toString()}`}
															className="pr-12"
															autoComplete="off"
															{...field}
														/>
														<Button
															type="button"
															variant="destructive"
															className="ml-2"
															onClick={() => {
																removeOption(index)
															}}
														>
															<LuMinusCircle size={20} />
															<span className="sr-only">Remove Option</span>
														</Button>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								)
							})}
							<Button
								type="button"
								variant="secondary"
								className="w-full max-w-4xl"
								onClick={addOption}
								disabled={fields.length >= 5}
							>
								<LuPlusCircle size={20} />
								<span className="sr-only">Add Option</span>
							</Button>
							<Button
								type="submit"
								variant="default"
								size="lg"
								className="w-full max-w-4xl"
								disabled={isPending}
							>
								Submit
							</Button>
						</div>
					</form>
					{isDev ? <DevTool control={form.control} /> : null}
				</Form>
			</CardContent>
		</Card>
	)
}

export default CreatePoll
