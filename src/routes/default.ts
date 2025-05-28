import { FastifyTypedInstance } from '../@types';

export async function defaultRoutes(server: FastifyTypedInstance) {
  server.get('', () => {
    return { status: 'running' };
  });

  server.get('/health', async (request, reply) => {
    reply.send({
      status: 'ok',
      timestamp: new Date().toISOString(),
    });
  });
}
