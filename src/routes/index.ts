import { FastifyTypedInstance } from '../@types';

import { defaultRoutes } from './default';

export async function registerRoutes(server: FastifyTypedInstance) {
  await server.register(defaultRoutes, { prefix: '/' });
}
