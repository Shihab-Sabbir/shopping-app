import { z } from 'zod';

export const createItemValidation = z.object({
  body: z
    .object({
      id: z.string({
        required_error: 'Id is required and must be a string',
      }),
      name: z.string({
        required_error: 'Name is required and must be a string',
      }),
    })
    .strict(),
});

export const updateItemIdValidation = z.object({
  body: z
    .object({
      id: z.string({
        required_error: 'Item ID is required and must be a string',
      }),
      name: z.string({
        required_error: 'Name is required and must be a string',
      }),
    })
    .strict(),
});
