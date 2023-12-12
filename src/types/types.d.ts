import { JWT } from '@fastify/jwt';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: any;
    jwt: JWT;
  }

  interface FastifyRequest {
    jwtVerify: any;
  }
}
