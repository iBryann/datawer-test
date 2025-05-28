import z from 'zod';

import { Role } from '../../prisma';
import { access } from 'fs';

export const signupRequestSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export const signupResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  role: z.nativeEnum(Role),
});

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  role: z.nativeEnum(Role),
});

export const signinRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const signinResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  role: z.nativeEnum(Role),
  accessToken: z.string(),
});

export const errorSchema = z.object({
  error: z.string(),
});
