import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import LoggerSql from '@/factory/LoggerSql';
import * as schema from './schema';

const dbName = process.env.DB_NAME || 'database';
const dbUser = process.env.DB_USER || 'username';
const dbPassword = process.env.DB_PASSWORD || 'password';
const dbHost = process.env.DB_HOST || 'localhost';
const connectionString = `postgres://${dbUser}:${dbPassword}@${dbHost}/${dbName}`;

export const connection = postgres(connectionString);
export const db = drizzle(connection, { schema, logger: new LoggerSql() });
