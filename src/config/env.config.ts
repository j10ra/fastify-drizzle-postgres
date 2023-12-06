import moduleAlias from 'module-alias';
import path from 'path';
import envSchema from 'env-schema';
import { z } from 'zod';
import { zodToJsonSchema as s } from 'zod-to-json-schema';

moduleAlias.addAliases(
  ['config', 'helpers', 'middleware', 'modules', 'routes', 'types', 'db'].reduce(
    (acc, alias) => {
      acc[`@/${alias}`] = `${__dirname}/../${alias}`;
      return acc;
    },
    {}
  )
);

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
      })
    ),
    dotenv: true,
  });
}

loadConfig();
