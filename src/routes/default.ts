import { FastifyTypedInstance } from '../@types';
import { populateDatabase } from '../utils';

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

  server.post('/populate-db', async (request, reply) => {
    populateDatabase();

    reply.send('Databse populated successfully');
  });
}
