import { fastify as Fastify, FastifyReply, FastifyRequest } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import FastifyJWT from '@fastify/jwt';

import { authenticate } from './modules';
import { registerRoutes } from './routes';
import { populateDatabase } from './utils';

async function initServer() {
  const fastify = Fastify().withTypeProvider<ZodTypeProvider>();

  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  fastify.register(FastifyJWT, {
    secret: process.env.JWT_SECRET,
  });

  fastify.decorate('authenticate', authenticate);

  fastify.register(fastifyCors, { origin: '*' });
  fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'API',
        description: 'API documentation',
        version: '1.0.0',
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
    transform: jsonSchemaTransform,
  });
  fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  });

  await registerRoutes(fastify);

  fastify.listen({ port: 3333 }, (error, address) => {
    if (error) {
      fastify.log.error(error);
      process.exit(1);
    }

    console.log('🚀 HTTP server running!');
    console.log('Url: http://localhost:3333/');
    console.log('Doc: http://localhost:3333/docs');

    populateDatabase();
  });
}

initServer();
