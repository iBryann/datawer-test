import { FastifyRequest, FastifyReply } from 'fastify';

import { MSG } from '../../utils';
import { Role } from '../../prisma';
import { JWTUserType } from '../../@types';

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const ALLOWED_ROLES: Role[] = [Role.ADMIN];
    const user: JWTUserType = await request.jwtVerify();

    if (!user || !ALLOWED_ROLES.includes(user.role))
      reply.status(401).send({ error: MSG.ERROR.UNAUTHORIZED_REQUEST });
  } catch (error) {
    reply.status(401).send({ error: MSG.ERROR.UNAUTHORIZED_REQUEST });
  }
}
