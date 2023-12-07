import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { UserSchema } from './User.schema';

export const UserXTokenSchema = pgTable('UserXToken', {
    id: uuid('id').primaryKey().defaultRandom(),
    refreshToken: text('refresh_token'),
    userProfileId: uuid('user_profile_id').notNull().references(() => UserSchema.id),
    createdAt: timestamp('created_at').default(sql`now()`),
    updatedAt: timestamp('updated_at').default(sql`now()`),
    lastUsedAt: timestamp('last_used_at')
});

export type UserXToken = typeof UserXTokenSchema.$inferSelect;
export type NewUserXToken = typeof UserXTokenSchema.$inferInsert;