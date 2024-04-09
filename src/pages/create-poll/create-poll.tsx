import { useTransition } from 'react';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CreatePoll as CreatePollType, createPollSchema } from '@/types/poll.type';

const CreatePoll: React.FC = () => {
  const [isPending, startTransition] = useTransition()

  const form = useForm<CreatePollType>({
    resolver: zodResolver(createPollSchema),
    defaultValues: {
      question: '',
      options: [
        '',
        '',
      ],
    }
  })

  const onSubmit = (data: CreatePollType) => {
    const submitData = async () => {
      try {
        const result = await fetch('http://localhost:8080/create-poll', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
    
        console.log(result)
      } catch (err: unknown) {
        console.error(err)
        throw new Error(`Error creating poll: ${JSON.stringify(err)}`)
      }
    }
  
    startTransition(() => {
      submitData().catch((err: unknown) => {
        console.error(err)
        throw new Error(`Error creating poll: ${JSON.stringify(err)}`)
      });
    })
  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-4'>
      <div className='flex flex-col items-center gap-4'>
        <FormField
          control={form.control}
          name='question'
          render={({ field }) => (
            <FormItem className='relative space-y-0 w-[500px]'>
              <FormLabel className='sr-only'>Question</FormLabel>
              <FormControl>
                <Input
                  placeholder='What would you like to ask?'
                  className='pr-12'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='options.0'
          render={({ field }) => (
            <FormItem className='relative space-y-0 w-[500px]'>
              <FormLabel className='sr-only'>Option 1</FormLabel>
              <FormControl>
                <Input
                  placeholder='Option 1'
                  className='pr-12'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name='options.1'
          render={({ field }) => (
            <FormItem className='relative space-y-0 w-[500px]'>
              <FormLabel className='sr-only'>Option 2</FormLabel>
              <FormControl>
                <Input
                  placeholder='Option 2'
                  className='pr-12'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' variant='default' size='lg' className='self-start' disabled={isPending}>Submit</Button>
      </div>
    </form>
  </Form>
  )
}

export default CreatePoll