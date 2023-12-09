import crypto from 'crypto';
import server from '@/server';

export const TokenManager = {
  /**
   * Generates an access token for a user.
   *
   * @param {string} userId - The user's unique identifier.
   */
  generateAccessToken: (userId: string) => {
    return server.jwt.sign({ userId }, { expiresIn: '15mm' });
  },

  /**
   * Generates a refresh token for a user.
   *
   * @param {string} userId - The user's unique identifier.
   */
  generateRefreshToken: (userId: string) => {
    const hash = crypto.createHash('sha256');
    const salt = new Date().toISOString() + crypto.randomBytes(16).toString('hex');

    hash.update(userId + process.env.X_TOKEN_SECRET + salt);
    return hash.digest('hex').substring(0, 64);
  },

  /**
   * Generates a hashed password and a salt for a user.
   *
   * @param {string} password - The user's password.
   */
  generatePasswordToken: (password: string) => {
    /*
     * Creating a unique salt for a particular user
     * Salt is a random bit of data added to the user's password
     * Salt means that every password's hash is going to be unique
     */
    const salt = crypto.randomBytes(16).toString('hex');

    /*
     * Create a hash with 1000 iterations
     */
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

    return { hash, salt };
  },

  /**
   * Verifies a candidate password against the stored hash and salt.
   *
   * @param {string} candidatePassword - The password to verify.
   * @param {string} hash - The stored hash.
   * @param {string} salt - The stored salt.
   */
  verifyPasswordToken: (candidatePassword: string, hash: string, salt: string) => {
    /*
     * Create a hash with the salt from the user and the password
     * the user tried to login with
     */
    const candidateHash = crypto
      .pbkdf2Sync(candidatePassword, salt, 1000, 64, 'sha512')
      .toString('hex');

    /*
     * If the hash matches the hash we have stored for the user
     * then the candidate password is correct
     */

    return candidateHash === hash;
  },

  /**
   * Verifies a refresh token for a user.
   *
   * @param {string} tokenToVerify - The token to verify.
   * @param {string} userId - The user's unique identifier.
   */
  verifyRefreshToken: (tokenToVerify: string, userId: string) => {
    const hash = crypto.createHash('sha256');

    hash.update(userId + process.env.X_TOKEN_SECRET);
    const expectedToken = hash.digest('hex').substring(0, 64);

    return expectedToken === tokenToVerify;
  },
};
