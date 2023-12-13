require('./src/config/env.config');

const dbName = process.env.DB_NAME || 'database';
const dbUser = process.env.DB_USER || 'username';
const dbPassword = process.env.DB_PASSWORD || 'password';
const dbHost = process.env.DB_HOST || 'localhost';

module.exports = {
  schema: './src/db/schema',
  out: './migrations',
  driver: 'pg',
  dbCredentials: {
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbName,
  },
  verbose: true,
  strict: true,
};
