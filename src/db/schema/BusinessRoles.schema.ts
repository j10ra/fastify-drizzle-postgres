import { sql } from 'drizzle-orm';
import { pgTable, text, uuid, timestamp, boolean, index } from 'drizzle-orm/pg-core';
import BusinessProfile from './BusinessProfiles.schema';

export const BusinessRole = pgTable(
  'BusinessRoles',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    businessProfileId: uuid('businessProfileId')
      .notNull()
      .references(() => BusinessProfile.id),
    functionName: text('functionName'),
    deleted: boolean('deleted'),
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
export default BusinessRole;
