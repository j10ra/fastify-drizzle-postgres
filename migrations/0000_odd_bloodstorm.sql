CREATE TABLE IF NOT EXISTS "Users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text,
	"firstname" text,
	"lastname" text,
	"middlename" text,
	"password" text,
	"salt" text,
	"created_at" timestamp DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
	"updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
	CONSTRAINT "Users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserXToken" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"refresh_token" text,
	"user_profile_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
	"updated_at" timestamp DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
	"last_used_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserXToken" ADD CONSTRAINT "UserXToken_user_profile_id_Users_id_fk" FOREIGN KEY ("user_profile_id") REFERENCES "Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
