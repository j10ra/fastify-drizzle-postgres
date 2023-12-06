import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const UserSchema = pgTable('Users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  phone: varchar('phone', { length: 256 }),
});

export type User = typeof UserSchema.$inferSelect;
export type NewUser = typeof UserSchema.$inferInsert;
