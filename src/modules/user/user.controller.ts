import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserInput } from './user.schema';
import { HttpBadRequestError } from '@/factory/ServerError';
import { insertUser, queryUserByEmail } from './user.service';
import { Controller } from '@/factory/Controller';
import { TokenManager } from '@/factory/TokenManager';
import Logger from '@/factory/Logger';
import ResponseData from '@/factory/ResponseData';

export const createUser = Controller<{ Body: CreateUserInput }>(async (req, reply) => {
  const body: CreateUserInput = req.body;
  const { hash: password, salt } = TokenManager.generatePasswordToken(body.password);
  const newUser = {
    ...body,
    password,
    salt,
  }

  Logger.log(req, { message: 'validate username' });
  const users = await queryUserByEmail(body.email)

  if (users.count >= 1) {
    throw new HttpBadRequestError('Username is already taken')
  }

  return new ResponseData(reply, await insertUser(newUser));
})


export async function getAllUsers(request: FastifyRequest, reply: FastifyReply) {
  try {
    return new ResponseData(reply, 'test');
  } catch (err) {
    throw err;
  }
}