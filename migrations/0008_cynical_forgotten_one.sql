DROP INDEX IF EXISTS "emailIdx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "usernameIdx" ON "Authentication" ("email");