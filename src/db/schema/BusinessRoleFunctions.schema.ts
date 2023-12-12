import { sql } from 'drizzle-orm';
import { pgTable, uuid, timestamp, boolean, index } from 'drizzle-orm/pg-core';
import BusinessProfile from './BusinessProfile.schema';
import { BusinessRole } from './BusinessRoles.schema';
import AuthSchema from './Authentication.schema';

export const BusinessRoleFunction = pgTable(
  'BusinessRoleFunctions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    businessProfileId: uuid('businessProfileId')
      .notNull()
      .references(() => BusinessProfile.id),
    businessRoleId: uuid('businessRoleId')
      .notNull()
      .references(() => BusinessRole.id),
    userId: uuid('userId')
      .notNull()
      .references(() => AuthSchema.id),
    isEnabled: boolean('isEnabled'),
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
