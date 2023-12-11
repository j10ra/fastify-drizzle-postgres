import { sql } from 'drizzle-orm';
import { pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core';

export const AuthSchema = pgTable('Authentication', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').unique(),
  firstname: text('firstname'),
  lastname: text('lastname'),
  middlename: text('middlename'),
  password: text('password'),
  salt: text('salt'),
  createdAt: timestamp('createdAt').default(sql`(CURRENT_TIMESTAMP AT TIME ZONE 'UTC')`),
  updatedAt: timestamp('updatedAat').default(sql`(CURRENT_TIMESTAMP AT TIME ZONE 'UTC')`),
});

export type User = typeof AuthSchema.$inferSelect;
export type NewUser = typeof AuthSchema.$inferInsert;
export default AuthSchema;
