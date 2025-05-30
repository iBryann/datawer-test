import { FastifyTypedInstance } from '../@types';

import { defaultRoutes } from './default';
import { professionalRoutes, userRoutes } from '../modules';

export async function registerRoutes(server: FastifyTypedInstance) {
  await server.register(defaultRoutes, { prefix: '/api' });
  await server.register(userRoutes, { prefix: '/api/user' });
  await server.register(professionalRoutes, { prefix: '/api/professional' });
}
