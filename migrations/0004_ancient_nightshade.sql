ALTER TABLE "Users" RENAME TO "Authentication";--> statement-breakpoint
ALTER TABLE "Authentication" DROP CONSTRAINT "Users_email_unique";--> statement-breakpoint
ALTER TABLE "UserXToken" DROP CONSTRAINT "UserXToken_userProfileId_Users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserXToken" ADD CONSTRAINT "UserXToken_userProfileId_Authentication_id_fk" FOREIGN KEY ("userProfileId") REFERENCES "Authentication"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "Authentication" ADD CONSTRAINT "Authentication_email_unique" UNIQUE("email");