import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserInput, LoginInput } from './user.schema';
import { BadRequestError, ServerError, UnauthorizedError } from '@/helpers/ServerError';
import Logger from '@/helpers/Logger';
import { UserSchema } from '@/db/schema/User.schema';
import { db } from '@/db';
import ResponseData from '@/helpers/ResponseData';
// import User from '@/models/User';

export async function createUser(
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply
) {}

export const login = async (request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) => {
  try {
    const { email, password } = request.body;
    // traceLog(request, { message: 'Check user email and password' });

    // await User.create({
    //   firstName: 'jets',
    // });

    // throw new UnauthorizedError('User not found');

    // await db.insert(UserSchema).values({
    //   ''
    // });

    await db.insert(UserSchema).values({
      username: 'exampleUsername',
      firstname: 'exampleFirstname',
      lastname: 'exampleLastname',
      middlename: 'exampleMiddlename',
      password: 'examplePassword',
      salt: 'exampleSalt',
    });

    return new ResponseData(reply, {
      ok: 'ok',
    });
  } catch (err) {
    throw err;
  }
};
