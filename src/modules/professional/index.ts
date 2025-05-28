import z from 'zod';

import { MSG, prisma } from '../../utils';
import { FastifyTypedInstance } from '../../@types';
import { profBodySchema, errorSchema, error500Schema } from './schemas';

export async function professionalRoutes(fastify: FastifyTypedInstance) {
  fastify.get(
    '/list',
    {
      // @ts-ignore
      onRequest: [fastify.authenticate],
      schema: {
        tags: ['professional'],
        description: 'Get all users',
      },
    },
    async (request, reply) => {
      try {
        const professionals = await prisma.professional.findMany();

        reply.send(professionals);
      } catch (error) {
        console.error(MSG.ERROR.PROF.LIST, error);
        reply.status(500).send({ error: MSG.ERROR.INTERNAL_SERVER_ERROR });
      }
    }
  );

  fastify.get(
    '/:id?',
    {
      // @ts-ignore
      onRequest: [fastify.authenticate],
      schema: {
        tags: ['professional'],
        description: 'Get user by ID',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: profBodySchema.describe('Get user'),
          404: errorSchema.describe(MSG.ERROR.PROF.NOT_FOUND),
          500: error500Schema,
        },
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.params;

        const professional = id
          ? await prisma.professional.findUnique({
              where: {
                id,
              },
            })
          : null;

        if (!professional)
          reply.status(404).send({ error: MSG.ERROR.PROF.NOT_FOUND });

        reply.status(200).send(professional!);
      } catch (error) {
        console.error(MSG.ERROR.PROF.GET, error);
        reply.status(500).send({ error: MSG.ERROR.INTERNAL_SERVER_ERROR });
      }
    }
  );

  fastify.post(
    '',
    {
      // @ts-ignore
      onRequest: [fastify.authenticate],
      schema: {
        tags: ['professional'],
        description: 'Create a new user',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          qualifications: z.string(),
        }),
        response: {
          200: profBodySchema.describe('Created user'),
          409: errorSchema.describe(MSG.ERROR.PROF.CREATE),
          500: error500Schema,
        },
      },
    },
    async (request, reply) => {
      try {
        const { name, email, qualifications } = request.body;

        const thereIsProf = await prisma.professional.findUnique({
          where: { email },
        });

        if (thereIsProf)
          reply.status(409).send({ error: MSG.INFO.EMAIL_ALREADY_EXISTS });

        const user = await prisma.professional.create({
          data: {
            name,
            email,
            qualifications,
          },
        });

        reply.status(200).send(user);
      } catch (error) {
        console.error(MSG.ERROR.PROF.CREATE, error);
        reply.status(500).send({ error: MSG.ERROR.INTERNAL_SERVER_ERROR });
      }
    }
  );

  fastify.patch(
    '',
    {
      // @ts-ignore
      onRequest: [fastify.authenticate],
      schema: {
        tags: ['professional'],
        description: 'Update user',
        body: z.object({
          id: z.string().uuid(),
          name: z.string(),
          email: z.string().email(),
          qualifications: z.string(),
        }),
        response: {
          200: profBodySchema.describe('Update user'),
          409: errorSchema.describe('Error update user'),
          500: error500Schema,
        },
      },
    },
    async (request, reply) => {
      try {
        const { id, name, email, qualifications } = request.body;

        const existingProf = await prisma.professional.findUnique({
          where: { id },
        });

        if (existingProf?.email === email) {
          await prisma.professional
            .update({
              where: { id },
              data: {
                name,
                qualifications,
              },
            })
            .then((professional) => {
              reply.send(professional);
            });
        }

        const existingEmail = await prisma.professional.findFirst({
          where: { email },
        });

        if (existingEmail) {
          return reply
            .status(409)
            .send({ error: MSG.INFO.EMAIL_ALREADY_EXISTS });
        } else {
          await prisma.professional
            .update({
              where: { id },
              data: {
                name,
                email,
                qualifications,
              },
            })
            .then((professional) => {
              reply.send(professional);
            });
        }
      } catch (error) {
        console.error(MSG.ERROR.PROF.UPDATE, error);
        reply.status(500).send({ error: MSG.ERROR.INTERNAL_SERVER_ERROR });
      }
    }
  );

  fastify.delete(
    '',
    {
      // @ts-ignore
      onRequest: [fastify.authenticate],
      schema: {
        tags: ['professional'],
        description: 'Update user',
        body: z.object({
          id: z.string().uuid(),
        }),
        response: {
          204: profBodySchema.describe('Delete user'),
          409: errorSchema.describe('Error deleting user'),
          500: error500Schema,
        },
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.body;

        const professional = await prisma.professional.delete({
          where: { id },
        });

        console.log('delete', professional);
        reply.status(204).send(professional);
      } catch (error) {
        console.error(MSG.ERROR.PROF.DELETE, error);
        reply.status(500).send({ error: MSG.ERROR.INTERNAL_SERVER_ERROR });
      }
    }
  );
}
