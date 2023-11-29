import { z } from 'zod';

export const loginZodSchema = z.object({
  body: z
    .object({
      email: z.string({
        required_error: 'Email is required',
      }),
      password: z.string({
        required_error: 'Password is required',
      }),
    })
    .strict(),
});

export const createUserZodSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string({ required_error: 'Password is required' }),
  }),
});
