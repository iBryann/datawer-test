import { fastify } from 'fastify';
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

import { registerRoutes } from './routes';

async function initServer() {
  const server = fastify().withTypeProvider<ZodTypeProvider>();

  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);

  // server.addHook('onRequest', async (request, reply) => {
  //   try {
  //     console.log(`Received request: ${request.method} ${request.url}`);
  //   } catch (err) {
  //     reply.send(err);
  //   }
  // });

  server.register(FastifyJWT, {
    secret: process.env.JWT_SECRET,
  });
  server.register(fastifyCors, { origin: '*' });
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'API',
        description: 'API documentation',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  });
  server.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  });

  await registerRoutes(server);

  server.listen({ port: 3333 }, (err, address) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }

    console.log('🚀 HTTP server running!');
  });
}

initServer();
