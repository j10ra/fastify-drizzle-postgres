import { sql } from 'drizzle-orm';
import { db } from '@/db';
import { NewUser, User, AuthSchema } from '@/db/schema/User.schema';

export async function insertUser(newUser: NewUser) {
  const userData = await db
    .insert(AuthSchema)
    .values(newUser)
    .returning({
      id: AuthSchema.id,
      email: AuthSchema.email,
      firstname: AuthSchema.firstname,
      lastname: AuthSchema.lastname,
      middlename: AuthSchema.middlename,
      createdAt: AuthSchema.createdAt,
      updatedAt: AuthSchema.updatedAt,
    })
    .execute();

  return userData.pop();
}

export async function queryUserByEmail(email: string) {
  return await db.execute<User>(
    sql`SELECT * FROM ${AuthSchema} WHERE ${AuthSchema.email} = ${email}`
  );
}
