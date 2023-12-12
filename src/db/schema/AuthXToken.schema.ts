import { pgTable, uuid, text, timestamp, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { AuthSchema } from './Authentication.schema';

export const AuthXTokenSchema = pgTable(
  'AuthXToken',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    refreshToken: text('refreshToken'),
    userProfileId: uuid('userProfileId')
      .notNull()
      .references(() => AuthSchema.id),
    createdAt: timestamp('createdAt').default(sql`(CURRENT_TIMESTAMP AT TIME ZONE 'UTC')`),
    updatedAt: timestamp('updatedAt').default(sql`(CURRENT_TIMESTAMP AT TIME ZONE 'UTC')`),
    lastUsedAt: timestamp('lastUsedAt'),
  },
  (table) => {
    return {
      refreshTokenIdx: index('refreshTokenIdx').on(table.refreshToken),
    };
  }
);

export type UserXToken = typeof AuthXTokenSchema.$inferSelect;
export type NewUserXToken = typeof AuthXTokenSchema.$inferInsert;
export default AuthXTokenSchema;
