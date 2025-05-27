import z from 'zod';

import { MSG } from '../../utils';

export const profBodySchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  email: z.string().email(),
  qualifications: z.string().nullable(),
});

export const errorSchema = z.object({
  error: z.string(),
});

export const error500Schema = z
  .object({
    error: z.string(),
  })
  .describe(MSG.ERROR.INTERNAL_SERVER_ERROR);
