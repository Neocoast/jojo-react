import { z } from 'zod';

const emailField = z.string().min(1, 'Email is required').email('Invalid email format');

const passwordField = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must include at least one uppercase letter')
  .regex(/[a-z]/, 'Must include at least one lowercase letter')
  .regex(/[0-9]/, 'Must include at least one number')
  .regex(/[^a-zA-Z0-9]/, 'Must include at least one special character');

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
    email: emailField,
    password: passwordField,
    password_confirmation: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match',
    path: ['password_confirmation'],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
