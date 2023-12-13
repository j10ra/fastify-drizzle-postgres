import './src/config/env.config';
import type { Config } from 'drizzle-kit';

const dbName = process.env.DB_NAME || 'database';
const dbUser = process.env.DB_USER || 'username';
const dbPassword = process.env.DB_PASSWORD || 'password';
const dbHost = process.env.DB_HOST || 'localhost';

export default {
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
} satisfies Config;
