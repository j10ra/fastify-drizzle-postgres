CREATE TABLE IF NOT EXISTS "Users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" text,
	"firstname" text,
	"lastname" text,
	"middlename" text,
	"password" text,
	"salt" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "Users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "UserXToken" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"refresh_token" text,
	"user_profile_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"last_used_at" timestamp
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "UserXToken" ADD CONSTRAINT "UserXToken_user_profile_id_Users_id_fk" FOREIGN KEY ("user_profile_id") REFERENCES "Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
