import { sql } from 'drizzle-orm';
import { pgTable, serial, text, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';


export const UserSchema = pgTable('Users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').unique(),
  firstname: text('firstname'),
  lastname: text('lastname'),
  middlename: text('middlename'),
  password: text('password'),
  salt: text('salt'),
  createdAt: timestamp('created_at').default(sql`(CURRENT_TIMESTAMP AT TIME ZONE 'UTC')`),
  updatedAt: timestamp('updated_at').default(sql`(CURRENT_TIMESTAMP AT TIME ZONE 'UTC')`)
});

export type User = typeof UserSchema.$inferSelect;
export type NewUser = typeof UserSchema.$inferInsert;