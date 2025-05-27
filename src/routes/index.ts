import { FastifyTypedInstance } from '../@types';

import { defaultRoutes } from './default';
import { userRoutes } from './user';

export async function registerRoutes(server: FastifyTypedInstance) {
  await server.register(defaultRoutes, { prefix: '/' });
  await server.register(userRoutes, { prefix: '/user' });
}
