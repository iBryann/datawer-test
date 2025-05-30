import {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { Role } from '../prisma';

export type FastifyTypedInstance = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  ZodTypeProvider
>;

export type JWTUserType = {
  id: string;
  email: string;
  name: string;
  role: Role;
  iat: number;
};
