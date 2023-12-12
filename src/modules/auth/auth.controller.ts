import type { FastifyReply, FastifyRequest } from 'fastify';
import { LoginInput, LogoutInput, RefreshTokenInput } from './auth.schema';
import { queryUserByEmail, queryUserId } from '../user/user.service';
import { HttpInternalServerError, HttpUnauthorizedError } from '@/factory/ServerError';
import {
  deleteXTokenByUserProfileId,
  deleteXTokenByXToken,
  findRefreshToken,
  insertRefreshToken,
  updateRefreshToken,
} from './auth.service';
import { Controller } from '@/factory/Controller';
import { TokenManager } from '@/factory/TokenManager';
import ResponseData from '@/factory/ResponseData';

export async function loginHandler(req: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) {
  const { username, password }: LoginInput = req.body;
  const users = await queryUserByEmail(username);

  if (users.count === 0 || (!users.at(0).password && !users.at(0).salt)) {
    throw new HttpUnauthorizedError();
  }

  const user = users.shift();
  const verified = TokenManager.verifyPasswordToken(password, user.password, user.salt);

  if (!verified) {
    throw new HttpUnauthorizedError();
  }

  const accessToken = TokenManager.generateAccessToken(user.id);
  const refreshToken = await insertRefreshToken(user.id);
  const payload = {
    accessToken,
    refreshToken,
  };

  return new ResponseData(reply, payload);
}

export const refreshTokenHandler = Controller<{ Body: RefreshTokenInput }>(async (req, reply) => {
  const { refreshToken } = req.body;
  const users = await findRefreshToken(refreshToken);

  if (users.count === 0) {
    throw new HttpInternalServerError('Cannot verify refresh token');
  }

  const verifiedUser = users.shift();

  // update refresh token
  await updateRefreshToken(verifiedUser.id);
  return new ResponseData(reply, TokenManager.generateAccessToken(verifiedUser.userProfileId));
});

export const logoutHandler = Controller<{ Body: LogoutInput }>(async (req, reply) => {
  const { refreshToken, userId, allDevices } = req.body;

  await deleteXTokenByXToken(refreshToken);
  allDevices && (await deleteXTokenByUserProfileId(userId));

  return new ResponseData(reply, 'Logout Success!');
});

export async function verifyTokenHandler(req: FastifyRequest, reply: FastifyReply) {
  const user = await queryUserId(req.user.userId);

  return new ResponseData(reply, user.pop());
}
