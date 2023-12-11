import { eq, sql } from 'drizzle-orm';
import { db } from '@/db';
import { UserXToken, UserXTokenSchema } from '@/db/schema/UserXToken.schema';
import { HttpInternalServerError } from '@/factory/ServerError';
import { TokenManager } from '@/factory/TokenManager';

export async function insertRefreshToken(userId: string) {
  try {
    const refreshToken = TokenManager.generateRefreshToken(userId);

    await db
      .insert(UserXTokenSchema)
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
    sql`SELECT * FROM ${UserXTokenSchema} WHERE ${UserXTokenSchema.refreshToken} = ${refreshToken}`
  );

  if (xToken.count === 0) {
    throw new HttpInternalServerError('Invalid refresh token');
  }

  return xToken;
}

export async function updateRefreshToken(id: string) {
  return await db
    .update(UserXTokenSchema)
    .set({
      lastUsedAt: sql`CURRENT_TIMESTAMP AT TIME ZONE 'UTC'`,
    })
    .where(eq(UserXTokenSchema.id, id))
    .returning({
      id: UserXTokenSchema.id,
      lastUsedAt: UserXTokenSchema.lastUsedAt,
    });
}

export async function deleteXTokenByUserProfileId(userProfile: string) {
  await db.delete(UserXTokenSchema).where(eq(UserXTokenSchema.userProfileId, userProfile));
}

export async function deleteXTokenByXToken(token: string) {
  await db.delete(UserXTokenSchema).where(eq(UserXTokenSchema.refreshToken, token));
}
