import { eq, sql } from 'drizzle-orm';
import { db } from '@/db';
import { UserXToken, AuthXTokenSchema } from '@/db/schema/AuthXToken.schema';
import { HttpInternalServerError } from '@/factory/ServerError';
import { TokenManager } from '@/factory/TokenManager';

export async function insertRefreshToken(userId: string) {
  try {
    const refreshToken = TokenManager.generateRefreshToken(userId);

    await db
      .insert(AuthXTokenSchema)
      .values({
        userProfileId: userId,
        refreshToken,
      })
      .execute();

    return refreshToken;
  } catch (err) {
    throw new HttpInternalServerError();
  }
}

export async function findRefreshToken(refreshToken: string) {
  const xToken = await db.execute<UserXToken>(
    sql`SELECT * FROM ${AuthXTokenSchema} WHERE ${AuthXTokenSchema.refreshToken} = ${refreshToken}`
  );

  if (xToken.count === 0) {
    throw new HttpInternalServerError('Invalid refresh token');
  }

  return xToken;
}

export async function updateRefreshToken(id: string) {
  return await db
    .update(AuthXTokenSchema)
    .set({
      lastUsedAt: sql`CURRENT_TIMESTAMP AT TIME ZONE 'UTC'`,
    })
    .where(eq(AuthXTokenSchema.id, id))
    .returning({
      id: AuthXTokenSchema.id,
      lastUsedAt: AuthXTokenSchema.lastUsedAt,
    });
}

export async function deleteXTokenByUserProfileId(userProfile: string) {
  await db.delete(AuthXTokenSchema).where(eq(AuthXTokenSchema.userProfileId, userProfile));
}

export async function deleteXTokenByXToken(token: string) {
  await db.delete(AuthXTokenSchema).where(eq(AuthXTokenSchema.refreshToken, token));
}
