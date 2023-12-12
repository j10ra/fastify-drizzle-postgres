ALTER TABLE "UserXToken" RENAME TO "AuthXToken";--> statement-breakpoint
ALTER TABLE "AuthXToken" DROP CONSTRAINT "UserXToken_userProfileId_Authentication_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "AuthXToken" ADD CONSTRAINT "AuthXToken_userProfileId_Authentication_id_fk" FOREIGN KEY ("userProfileId") REFERENCES "Authentication"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
