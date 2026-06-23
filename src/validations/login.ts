import { z } from 'zod';

const emailField = z.string().min(1, 'Email is required').email('Invalid email format');

export const loginSchema = z
  .object({
    password: z.string().min(1, 'Password is required'),
    email: emailField,
  });

export type LoginFormData = z.infer<typeof loginSchema>;
