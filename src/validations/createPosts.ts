import { z } from 'zod';

const titleField = z.string().trim().min(1, 'Title is required').max(100, '100 characters max')
const bodyField = z.string().trim().min(1, 'Body is required')

export const createPostSchema = z
  .object({
    title: titleField,
    body: bodyField
  });

  export type CreatePostFormData = z.infer<typeof createPostSchema>
