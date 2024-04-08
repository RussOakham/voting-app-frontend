import { endpoints } from "@/lib/endpoints"
import { useQuery } from "@tanstack/react-query"
import { z }  from 'zod'
import { ValidationError, ZodError, fromZodError} from 'zod-validation-error'

import { GetPolls, getPollsSchema } from "@/types/poll.type"

const { baseUrl, getPolls} = endpoints

const zodParse = <T extends z.ZodTypeAny>(schema: T, data: unknown): z.infer<T> => { 
    try {
        return schema.parse(data) 
    } catch (error: unknown) {
        const zodError: ValidationError = fromZodError(error as ZodError)
        throw new Error(zodError.toString() + `, Response data: ${data}`)
    }
}

export const useGetPollsQuery = () => {
    const query = useQuery({
        queryKey: ['polls'],
        queryFn: async (): Promise<GetPolls> => {
            const response = await fetch(`${baseUrl}${getPolls}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            
            })

            if (!response.ok) {
                throw new Error(`Error fetching polls: ${response.statusText}`)
            }

            const data = await response.json() as Promise<GetPolls>

            return zodParse(getPollsSchema, data)
        },
    })

    return query
}