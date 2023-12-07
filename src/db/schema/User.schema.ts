import { sql } from 'drizzle-orm';
import { pgTable, serial, text, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';


export const UserSchema = pgTable('Users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: text('username').unique(),
  firstname: text('firstname'),
  lastname: text('lastname'),
  middlename: text('middlename'),
  password: text('password'),
  salt: text('salt'),
  createdAt: timestamp('created_at').default(sql`now()`),
  updatedAt: timestamp('updated_at').default(sql`now()`)
});

export type User = typeof UserSchema.$inferSelect;
export type NewUser = typeof UserSchema.$inferInsert;