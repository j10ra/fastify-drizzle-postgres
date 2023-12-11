import { LoginInput, LogoutInput, RefreshTokenInput } from './auth.schema';
import { queryUserByEmail } from '../user/user.service';
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

export const loginHandler = Controller<{ Body: LoginInput }>(async (req, reply) => {
  const { email, password }: LoginInput = req.body;
  const users = await queryUserByEmail(email);

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
});

export const refreshTokenHandler = Controller<{ Body: RefreshTokenInput }>(async (req, reply) => {
  const { refreshToken } = req.body;
  const users = await findRefreshToken(refreshToken);

  if (users.count === 0) {
    throw new HttpInternalServerError('Cannot verify refresh token');
  }

  const verifiedUser = users.shift();

  // update refresh token
  await updateRefreshToken(verifiedUser.id);
  return new ResponseData(reply, {
    accessToken: TokenManager.generateAccessToken(verifiedUser.userProfileId),
  });
});

export const logoutHandler = Controller<{ Body: LogoutInput }>(async (req, reply) => {
  const { refreshToken, userId, allDevices } = req.body;

  await deleteXTokenByXToken(refreshToken);
  allDevices && (await deleteXTokenByUserProfileId(userId));

  return new ResponseData(reply, 'Logout Success!');
});
