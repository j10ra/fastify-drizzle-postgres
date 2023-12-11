import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserInput } from './user.schema';
import { HttpBadRequestError } from '@/factory/ServerError';
import { insertUser, queryUserByEmail } from './user.service';
import { Controller } from '@/factory/Controller';
import { TokenManager } from '@/factory/TokenManager';
import Debug from '@/factory/LoggerDebug';
import ResponseData from '@/factory/ResponseData';

export const createUser = Controller<{ Body: CreateUserInput }>(async (req, reply) => {
  const { body } = req;
  const { hash: password, salt } = TokenManager.generatePasswordToken(body.password);
  const newUser = {
    ...body,
    password,
    salt,
  };

  Debug.log(req, { message: 'validate username' });
  const users = await queryUserByEmail(body.email);

  if (users.count >= 1) {
    throw new HttpBadRequestError('Username is already taken');
  }

  return new ResponseData(reply, await insertUser(newUser));
});

export async function getAllUsers(request: FastifyRequest, reply: FastifyReply) {
  Debug.log(request, { message: 'testing...' });
  return new ResponseData(reply, 'test');
}
