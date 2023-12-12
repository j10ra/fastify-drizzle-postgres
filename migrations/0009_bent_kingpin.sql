ALTER TABLE "Authentication" RENAME COLUMN "email" TO "username";--> statement-breakpoint
ALTER TABLE "Authentication" DROP CONSTRAINT "Authentication_email_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "usernameIdx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "usernameIdx" ON "Authentication" ("username");--> statement-breakpoint
ALTER TABLE "Authentication" ADD CONSTRAINT "Authentication_username_unique" UNIQUE("username");