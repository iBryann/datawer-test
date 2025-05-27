import { MSG, prisma } from '../utils';
import { FastifyTypedInstance } from '../@types';
import z from 'zod';
import { Role } from '../prisma';

export const userBodySchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  email: z.string().email(),
  qualifications: z.string().nullable(),
  role: z.nativeEnum(Role),
});

export const errorSchema = z.object({
  error: z.string(),
});

export const error500Schema = z
  .object({
    error: z.string(),
  })
  .describe(MSG.ERROR.INTERNAL_SERVER_ERROR);

export async function userRoutes(server: FastifyTypedInstance) {
  server.get(
    '/list',
    {
      schema: {
        tags: ['user'],
        description: 'Get all users',
      },
    },
    async (request, reply) => {
      try {
        const users = await prisma.user.findMany();

        reply.send(users);
      } catch (error) {
        console.error(MSG.ERROR.USER.LIST, error);
        reply.status(500).send({ error: MSG.ERROR.INTERNAL_SERVER_ERROR });
      }
    }
  );

  server.get(
    '/:id?',
    {
      schema: {
        tags: ['user'],
        description: 'Get user by ID',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: userBodySchema.describe('Get user'),
          404: errorSchema.describe(MSG.ERROR.USER.NOT_FOUND),
          500: error500Schema,
        },
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params;

        const user = id
          ? await prisma.user.findUnique({
              where: {
                id,
              },
            })
          : null;

        if (!user) reply.status(404).send({ error: MSG.ERROR.USER.NOT_FOUND });

        reply.status(200).send(user!);
      } catch (error) {
        console.error(MSG.ERROR.USER.GET, error);
        reply.status(500).send({ error: MSG.ERROR.INTERNAL_SERVER_ERROR });
      }
    }
  );

  server.post(
    '',
    {
      schema: {
        tags: ['user'],
        description: 'Create a new user',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          qualifications: z.string(),
        }),
        response: {
          200: userBodySchema.describe('Created user'),
          409: errorSchema.describe('Error creating user'),
          500: error500Schema,
        },
      },
    },
    async (request, reply) => {
      try {
        const { name, email, qualifications } = request.body;

        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser)
          reply.status(409).send({ error: MSG.INFO.EMAIL_ALREADY_EXISTS });

        const user = await prisma.user.create({
          data: {
            name,
            email,
            qualifications,
          },
        });

        reply.status(200).send(user);
      } catch (error) {
        console.error(MSG.ERROR.USER.CREATE, error);
        reply.status(500).send({ error: MSG.ERROR.INTERNAL_SERVER_ERROR });
      }
    }
  );

  server.patch(
    '',
    {
      schema: {
        tags: ['user'],
        description: 'Update user',
        body: z.object({
          id: z.string().uuid(),
          name: z.string(),
          email: z.string().email(),
          qualifications: z.string(),
        }),
        response: {
          200: userBodySchema.describe('Update user'),
          409: errorSchema.describe('Error update user'),
          500: error500Schema,
        },
      },
    },
    async (request, reply) => {
      try {
        const { id, name, email, qualifications } = request.body;

        const existingUser = await prisma.user.findUnique({
          where: { id },
        });

        if (existingUser?.email === email) {
          await prisma.user
            .update({
              where: { id },
              data: {
                name,
                qualifications,
              },
            })
            .then((user) => {
              reply.send(user);
            });
        }

        const existingEmail = await prisma.user.findFirst({
          where: { email },
        });

        if (existingEmail) {
          return reply
            .status(409)
            .send({ error: MSG.INFO.EMAIL_ALREADY_EXISTS });
        } else {
          await prisma.user
            .update({
              where: { id },
              data: {
                name,
                email,
                qualifications,
              },
            })
            .then((user) => {
              reply.send(user);
            });
        }
      } catch (error) {
        console.error(MSG.ERROR.USER.UPDATE, error);
        reply.status(500).send({ error: MSG.ERROR.INTERNAL_SERVER_ERROR });
      }
    }
  );

  server.delete(
    '',
    {
      schema: {
        tags: ['user'],
        description: 'Update user',
        body: z.object({
          id: z.string().uuid(),
        }),
        response: {
          204: userBodySchema.describe('Delete user'),
          409: errorSchema.describe('Error deleting user'),
          500: error500Schema,
        },
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.body;

        const user = await prisma.user.delete({
          where: { id },
        });

        console.log('delete', user);
        reply.status(204).send(user);
      } catch (error) {
        console.error(MSG.ERROR.USER.DELETE, error);
        reply.status(500).send({ error: MSG.ERROR.INTERNAL_SERVER_ERROR });
      }
    }
  );
}
