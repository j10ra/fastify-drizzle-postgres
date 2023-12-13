CREATE TABLE IF NOT EXISTS "Authentication" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text,
	"firstname" text,
	"lastname" text,
	"middlename" text,
	"birthYear" text,
	"gender" text,
	"password" text,
	"salt" text,
	"createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
	"updatedAat" timestamp DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
	CONSTRAINT "Authentication_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "AuthXToken" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"refreshToken" text,
	"userProfileId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
	"updatedAt" timestamp DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
	"lastUsedAt" timestamp
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idIdx" ON "Authentication" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "usernameIdx" ON "Authentication" ("username");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "refreshTokenIdx" ON "AuthXToken" ("refreshToken");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "AuthXToken" ADD CONSTRAINT "AuthXToken_userProfileId_Authentication_id_fk" FOREIGN KEY ("userProfileId") REFERENCES "Authentication"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
