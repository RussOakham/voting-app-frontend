import { z } from 'zod'

export const createPollSchema = z.object({
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
  
  export type CreatePoll = z.infer<typeof createPollSchema>

  export const pollSchema = z.object({
    id: z.string(),
    question: z.string(),
    options: z.array(z.string()),
  })

  export type Poll = z.infer<typeof pollSchema>

  export const metadataSchema = z.object({
    attempts: z.number(),
    httpStatusCode: z.number(),
    requestId: z.string(),
    totalRetryDelay: z.number(),
  })

  export const getPollsSchema = z.object({
    $metadata: metadataSchema,
    Count: z.number(),
    Items: z.array(pollSchema),
    ScannedCount: z.number(),
  })

  export type GetPolls = z.infer<typeof getPollsSchema>