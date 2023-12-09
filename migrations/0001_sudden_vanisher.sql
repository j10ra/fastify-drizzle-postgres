ALTER TABLE "Users" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "Users" RENAME COLUMN "updated_at" TO "updatedAat";--> statement-breakpoint
ALTER TABLE "UserXToken" RENAME COLUMN "refresh_token" TO "refreshToken";--> statement-breakpoint
ALTER TABLE "UserXToken" RENAME COLUMN "user_profile_id" TO "userProfileId";--> statement-breakpoint
ALTER TABLE "UserXToken" RENAME COLUMN "created_at" TO "createdAt";--> statement-breakpoint
ALTER TABLE "UserXToken" RENAME COLUMN "updated_at" TO "updatedAt";--> statement-breakpoint
ALTER TABLE "UserXToken" RENAME COLUMN "last_used_at" TO "lastUsedAt";--> statement-breakpoint
ALTER TABLE "UserXToken" DROP CONSTRAINT "UserXToken_user_profile_id_Users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserXToken" ADD CONSTRAINT "UserXToken_userProfileId_Users_id_fk" FOREIGN KEY ("userProfileId") REFERENCES "Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
