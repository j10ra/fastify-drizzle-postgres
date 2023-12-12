import { eq } from 'drizzle-orm';
import { FastifyReply, FastifyRequest } from 'fastify';
import { GetBussinessProfileSchema } from './business.schema';
import { db } from '@/db';
import ResponseData from '@/factory/ResponseData';

import BusinessProfile from '@/db/schema/BusinessProfiles.schema';

export async function getBusinessProfileHandler(
  req: FastifyRequest<{ Params: GetBussinessProfileSchema }>,
  reply: FastifyReply
) {
  console.log(req.params);

  await db.select().from(BusinessProfile).where(eq(BusinessProfile.id, req.params.businessId));

  return new ResponseData(reply, 'ok');
}
