import { z } from 'zod';
import { zodToJsonSchema as s } from 'zod-to-json-schema';

export const loginSchema = {
  $id: 'loginSchema',
  body: s(
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
    })
  ),
  queryString: s(z.object({})),
  params: s(z.object({})),
  headers: s(z.object({})),
};
