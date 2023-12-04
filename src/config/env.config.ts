import path from 'path';
import envSchema from 'env-schema';
import { z } from 'zod';

export default function loadConfig(): void {
  const result = require('dotenv').config({
    path: path.join(__dirname, '..', '..', '.env'),
  });

  if (result.error) {
    throw new Error(result.error);
  }

  // return envSchema({
  //   data: result.parsed,
  //   schema: z.object({
  //     NODE_ENV: z.enum(['production', 'development']),
  //   }),
  // });
}
