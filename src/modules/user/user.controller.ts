import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserInput, LoginInput } from './user.schema';
import { BadRequestError, ServerError, UnauthorizedError } from '@/helpers/ServerError';
import Logger from '@/helpers/Logger';
import { User, UserSchema } from '@/db/schema/User.schema';
import { db } from '@/db';
import ResponseData from '@/helpers/ResponseData';
import { HashPassword } from '@/helpers/HashPassword';
import { sql } from 'drizzle-orm';
import { insertUser, queryUserByEmail } from './user.service';
import server from '@/server';

export async function createUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const body: CreateUserInput = request.body;
    const { hash: password, salt } = HashPassword.generate(body.password);
    const newUser = {
      ...body,
      password,
      salt,
    }

    Logger.log(request, { message: 'validate username' });
    const users = await queryUserByEmail(body.email)

    if (users.count >= 1) {
      throw new BadRequestError('Username is already taken')
    }

    return new ResponseData(reply, await insertUser(newUser));
  } catch (error) {
    Logger.log(request, { error: error.message });
    throw error
  }
}

export async function loginLocal(request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) {
  try {
    const { email, password }: LoginInput = request.body;
    const users = await queryUserByEmail(email);

    if (users.count === 0 || !users.at(0).password && !users.at(0).salt) {
      console.log('here >>')
      throw new UnauthorizedError()
    }

    const user = users.at(0);

    console.log('>>>', user)
    const verified = HashPassword.verify(password, user.password, user.salt);

    if (!verified) {

      console.log('here >>>', verified)
      throw new UnauthorizedError()

    }

    const test = {
      accessToken: server.jwt.sign({ id: user.id })
    }
    return new ResponseData(reply, test);
  } catch (err) {
    throw err;
  }
}


export async function getAllUsers(request: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) {
  try {

    return new ResponseData(reply, 'test');
  } catch (err) {
    throw err;
  }
}