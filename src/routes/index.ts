import { RouteConfig } from 'types/RouteConfig';
import version1Routes from './v1.routes';
import Logger from '@/factory/Logger';

export default function registerRoutes(server) {
  function loadVersionedRoutes(routes: RouteConfig[], version: string) {
    routes.forEach(({ route, prefix }) => {
      try {
        server.register(route, { prefix: `api/${version}${prefix}` });
      } catch (error) {
        Logger.error(`Error registering routes for version ${version}:`, error);
      }
    });
  }

  // Register all routes for each version
  loadVersionedRoutes(version1Routes, 'v1');
}
