import { FastifyInstance, RouteOptions } from 'fastify';

export type RouteConfig = {
  route: (fastify: FastifyInstance, opts: RouteOptions) => void;
  prefix: string;
};
