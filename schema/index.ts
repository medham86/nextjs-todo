import { z } from "zod"


export const todoFormSchema = z.object({
  title: z.string().min(8, {
      message: "Username must be at least 8 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  
  body: z.string().max(160).optional(),
  completed : z.boolean()
  
  
})

export type todoFormValues = z.infer<typeof todoFormSchema>

