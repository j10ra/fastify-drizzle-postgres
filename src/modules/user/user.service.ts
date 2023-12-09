import { sql } from 'drizzle-orm';
import { db } from '@/db';
import { NewUser, User, UserSchema } from '@/db/schema/User.schema';

export async function insertUser(newUser: NewUser) {
  const userData = await db
    .insert(UserSchema)
    .values(newUser)
    .returning({
      id: UserSchema.id,
      email: UserSchema.email,
      firstname: UserSchema.firstname,
      lastname: UserSchema.lastname,
      middlename: UserSchema.middlename,
      createdAt: UserSchema.createdAt,
      updatedAt: UserSchema.updatedAt,
    })
    .execute();

  return userData.pop();
}

export async function queryUserByEmail(email: string) {
  return await db.execute<User>(sql`SELECT * FROM "Users" WHERE "email" = ${email}`);
}
