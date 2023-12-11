import moduleAlias from 'module-alias';
import path from 'path';
import envSchema from 'env-schema';
import { z } from 'zod';
import { zodToJsonSchema as s } from 'zod-to-json-schema';

const locations = ['config', 'db', 'factory', 'middleware', 'modules', 'routes', 'server', 'types'];
const aliasReducer = (acc: { [x: string]: string }, alias: string) => {
  acc[`@/${alias}`] = `${__dirname}/../${alias}`;
  return acc;
};
const aliases = locations.reduce(aliasReducer, {});

moduleAlias.addAliases(aliases);

export default function loadConfig(): void {
  const result = require('dotenv').config({
    path: path.join(__dirname, '..', '..', '.env'),
  });

  if (result.error) {
    throw new Error(result.error);
  }

  return envSchema({
    data: result.parsed,
    schema: s(
      z.object({
        NODE_ENV: z.enum(['production', 'development']),
        LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']),
        API_PORT: z.string().regex(/^\d+$/, 'API_PORT must be a number').transform(Number),

        // database
        DB_HOST: z.string(),
        DB_NAME: z.string(),
        DB_USER: z.string(),
        DB_PASSWORD: z.string(),

        // secrets
        ACCESS_TOKEN_SECRET: z.string(),
        X_TOKEN_SECRET: z.string(),
      })
    ),
    dotenv: true,
  });
}

loadConfig();
