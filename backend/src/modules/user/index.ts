import bcrypt from 'bcrypt';

import { FastifyTypedInstance } from '../../@types';
import { MSG, prisma } from '../../utils';
import {
  signinRequestSchema,
  signinResponseSchema,
  errorSchema,
  signupRequestSchema,
  signupResponseSchema,
} from './schema';

export async function userRoutes(fastify: FastifyTypedInstance) {
  fastify.post(
    '/signin',
    {
      schema: {
        tags: ['user'],
        description: 'Sign in user',
        body: signinRequestSchema,
        response: {
          200: signinResponseSchema.describe(MSG.INFO.USER.SIGNIN),
          401: errorSchema.describe(MSG.ERROR.USER.INVALID_CREDENTIALS),
          500: errorSchema.describe(MSG.ERROR.INTERNAL_SERVER_ERROR),
        },
      },
    },
    async (request, reply) => {
      try {
        const { email, password } = request.body;

        const user = await prisma.user.findUnique({
          where: { email },
          omit: {
            createdAt: true,
            updatedAt: true,
          },
        });

        if (user) {
          const matchPassword = await bcrypt.compare(password, user.password);

          if (!matchPassword)
            reply
              .status(401)
              .send({ error: MSG.ERROR.USER.INVALID_CREDENTIALS });

          const userWithoutPassword = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
          const accessToken = fastify.jwt.sign(userWithoutPassword);
          const response = {
            ...userWithoutPassword,
            accessToken,
          };

          reply.status(200).send(response);
        }

        reply.status(401).send({ error: MSG.ERROR.USER.INVALID_CREDENTIALS });
      } catch (error) {
        console.error(error);
        reply.status(500).send({ error: MSG.ERROR.INTERNAL_SERVER_ERROR });
      }
    }
  );

  fastify.post(
    '/signup',
    {
      schema: {
        tags: ['user'],
        description: 'Create a new user',
        body: signupRequestSchema,
        response: {
          200: signupResponseSchema.describe(MSG.INFO.USER.SIGNUP),
          409: errorSchema.describe(MSG.ERROR.USER.CREATE),
          500: errorSchema.describe(MSG.ERROR.INTERNAL_SERVER_ERROR),
        },
      },
    },
    async (request, reply) => {
      try {
        const { email } = request.body;

        const thereIsUser = await prisma.user.findUnique({
          where: { email },
        });

        if (thereIsUser)
          reply.status(409).send({ error: MSG.INFO.EMAIL_ALREADY_EXISTS });

        const passwordHash = await bcrypt.hash(
          request.body.password,
          Number(process.env.SALT_ROUNDS || 10)
        );
        const user = await prisma.user.create({
          data: {
            ...request.body,
            password: passwordHash,
          },
          omit: {
            createdAt: true,
            updatedAt: true,
            password: true,
          },
        });

        // Gerar JWT aqui
        reply.status(200).send(user);
      } catch (error) {
        console.error(error);
        reply.status(500).send({ error: MSG.ERROR.INTERNAL_SERVER_ERROR });
      }
    }
  );
}
