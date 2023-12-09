import { RouteConfig } from 'types/RouteConfig';
import version1Routes from './v1.routes';

export default function registerRoutes(server) {
  function loadVersionedRoutes(routes: RouteConfig[], version: string) {
    routes.forEach(({ route, prefix }) => {
      try {
        server.register(route, { prefix: `/${version}${prefix}` });
      } catch (error) {
        console.error(`Error registering routes for version ${version}:`, error);
      }
    });
  }

  // Register all routes for each version
  loadVersionedRoutes(version1Routes, 'v1');
}
