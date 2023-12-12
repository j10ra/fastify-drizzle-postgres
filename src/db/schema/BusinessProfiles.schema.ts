import { sql } from 'drizzle-orm';
import { pgTable, text, uuid, timestamp, boolean, index } from 'drizzle-orm/pg-core';

export const BusinessProfile = pgTable(
  'BusinessProfiles',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name'),
    about: text('about'),
    address: text('address'),
    isOnboardingDone: boolean('isOnboardingDone'),
    isLive: boolean('isLive'),
    isVerified: boolean('isVerified'),
    createdAt: timestamp('createdAt').default(sql`(CURRENT_TIMESTAMP AT TIME ZONE 'UTC')`),
    updatedAt: timestamp('updatedAat').default(sql`(CURRENT_TIMESTAMP AT TIME ZONE 'UTC')`),
  },
  (table) => {
    return {
      idIdx: index('idIdx').on(table.id),
    };
  }
);

export type User = typeof BusinessProfile.$inferSelect;
export type NewUser = typeof BusinessProfile.$inferInsert;
export default BusinessProfile;
