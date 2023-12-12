import { z } from 'zod';
import { Utils } from '@/factory/Utils';

const getBussinessProfile = z.object({
  businessId: z.string({ required_error: 'Business profile id is required' }).min(6),
});

export const getBussinessProfileSchema = Utils.schemaHelper({ params: getBussinessProfile }, [
  'Business',
]);
export type GetBussinessProfileSchema = z.infer<typeof getBussinessProfile>;
