import { FastifyTypedInstance } from '../@types';

import { defaultRoutes } from './default';
import { professionalRoutes } from './professional';

export async function registerRoutes(server: FastifyTypedInstance) {
  await server.register(defaultRoutes, { prefix: '/' });
  await server.register(professionalRoutes, { prefix: '/professional' });
}
