import { useTransition } from 'react';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Shell } from './components/layouts/shells/shell';
import { Button } from './components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './components/ui/form';
import { Input } from './components/ui/input';

import './App.css'

const createPollSchema = z.object({
  question: z.string({
    required_error: "Question is required",
  }),
  options: z
    .string({
      required_error: "Options are required",
    }).array()
    .min(2, "At least two options are required")
    .max(5, "At most 5 options are allowed"),
})

type CreatePoll = z.infer<typeof createPollSchema>

function App() {
  const [isPending, startTransition] = useTransition()

  const form = useForm<CreatePoll>({
    resolver: zodResolver(createPollSchema),
    defaultValues: {
      question: '',
      options: [
        '',
        '',
      ],
    }
  })

  const onSubmit = (data: CreatePoll) => {
    const submitData = async () => {
      console.log(data)
  
      try {
        const result = await fetch('http://localhost:8080/polls', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
    
        console.log(result)
      } catch (err) {
        console.error(err)
      }
    }
  
    startTransition(() => {
      submitData().catch((err: unknown) => {
        console.error(err)
      });
    })
  }

  return (
    <Shell variant='zero-vertical-padding' className='max-w-6xl'>
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
    </Shell>
   
  )
}

export default App
