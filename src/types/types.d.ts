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

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { userId: string };
    user: {
      userId: string;
    };
  }
}
