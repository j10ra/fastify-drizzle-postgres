import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { AuthSchema } from './User.schema';

export const UserXTokenSchema = pgTable('UserXToken', {
  id: uuid('id').primaryKey().defaultRandom(),
  refreshToken: text('refreshToken'),
  userProfileId: uuid('userProfileId')
    .notNull()
    .references(() => AuthSchema.id),
  createdAt: timestamp('createdAt').default(sql`(CURRENT_TIMESTAMP AT TIME ZONE 'UTC')`),
  updatedAt: timestamp('updatedAt').default(sql`(CURRENT_TIMESTAMP AT TIME ZONE 'UTC')`),
  lastUsedAt: timestamp('lastUsedAt'),
});

export type UserXToken = typeof UserXTokenSchema.$inferSelect;
export type NewUserXToken = typeof UserXTokenSchema.$inferInsert;
export default UserXTokenSchema;
