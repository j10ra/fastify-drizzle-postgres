import { sql } from 'drizzle-orm';
import { db } from '@/db';
import { NewAuthUser, AuthUser, AuthSchema } from '@/db/schema/Authentication.schema';

export async function insertUser(newUser: NewAuthUser) {
  const userData = await db
    .insert(AuthSchema)
    .values(newUser)
    .returning({
      id: AuthSchema.id,
      username: AuthSchema.username,
      firstname: AuthSchema.firstname,
      lastname: AuthSchema.lastname,
      middlename: AuthSchema.middlename,
      createdAt: AuthSchema.createdAt,
      updatedAt: AuthSchema.updatedAt,
    })
    .execute();

  return userData.pop();
}

export async function queryUserByEmail(username: string) {
  return await db.execute<AuthUser>(
    sql`SELECT * FROM ${AuthSchema} WHERE ${AuthSchema.username} = ${username}`
  );
}

export async function queryUserId(userId: string) {
  return await db.execute<AuthUser>(
    sql`SELECT 
      ${AuthSchema.id},
      ${AuthSchema.username},
      ${AuthSchema.firstname},
      ${AuthSchema.lastname},
      ${AuthSchema.updatedAt}, 
      ${AuthSchema.createdAt}
    FROM ${AuthSchema} WHERE ${AuthSchema.id} = ${userId}`
  );
}
