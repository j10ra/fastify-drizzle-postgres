// refreshTokenHandler.test.ts
import { mockDeep, mockReset } from 'jest-mock-extended';
import { FastifyReply, FastifyRequest } from 'fastify';

import { loginHandler } from './auth.controller';
import ResponseData from '@/factory/ResponseData';
import { queryUserByEmail } from '../user/user.service';
import { TokenManager } from '@/factory/TokenManager';
import { insertRefreshToken } from './auth.service';
import { HttpUnauthorizedError } from '@/factory/ServerError';

jest.mock('../user/user.service', () => ({
  queryUserByEmail: jest.fn(),
}));

jest.mock('./auth.service', () => ({
  insertRefreshToken: jest.fn(),
}));

const mockedReply = mockDeep<FastifyReply>();

beforeEach(() => {
  mockReset(mockedReply);
  mockedReply.status.mockReturnThis();
});

describe('loginHandler', () => {
  const mockRequest = mockDeep<FastifyRequest<{ Body: { email: string; password: string } }>>();

  it('should handle successful login', async () => {
    // Arrange
    const user = {
      id: 'user-id',
      email: 'test@example.com',
      password: 'hashedPassword',
      salt: 'salt',
    };

    (queryUserByEmail as jest.Mock).mockResolvedValue({
      count: 1,
      shift: () => user,
      at: () => user,
    });
    TokenManager.verifyPasswordToken = jest.fn().mockReturnValue(true);
    TokenManager.generateAccessToken = jest.fn().mockReturnValue('access-token');
    (insertRefreshToken as jest.Mock).mockResolvedValue('refresh-token');

    mockRequest.body = { email: user.email, password: 'password' };

    // Act
    const result = await loginHandler(mockRequest, mockedReply);

    // Assert
    expect(mockedReply.status).toHaveBeenCalledWith(200);
    expect(mockedReply.send).toHaveBeenCalledWith({
      error: false,
      statusCode: 200,
      payload: {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
      },
    });
    expect(result).toBeInstanceOf(ResponseData);
  });

  it('should handle failed login', async () => {
    const user = {
      id: 'user-id',
      email: 'test@example.com',
      password: '',
      salt: '',
    };

    // Arrange
    (queryUserByEmail as jest.Mock).mockResolvedValue({
      count: 0,
      shift: () => user,
      at: () => user,
    });

    // Act
    await expect(loginHandler(mockRequest, mockedReply)).rejects.toThrow(HttpUnauthorizedError);
    expect(mockedReply.send).not.toHaveBeenCalled();
  });

  it('should handle un verified password', async () => {
    const user = {
      id: 'user-id',
      email: 'test@example.com',
      password: 'password',
      salt: '1234',
    };

    // Arrange
    (queryUserByEmail as jest.Mock).mockResolvedValue({
      count: 1,
      shift: () => user,
      at: () => user,
    });
    TokenManager.verifyPasswordToken = jest.fn().mockReturnValue(false);

    // Act
    await expect(loginHandler(mockRequest, mockedReply)).rejects.toThrow(HttpUnauthorizedError);
    expect(mockedReply.send).not.toHaveBeenCalled();
  });
});
