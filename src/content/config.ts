import { defineCollection, z } from "astro:content"

const books = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    url: z.string().url(),
  }),
})

export const collections = { books }