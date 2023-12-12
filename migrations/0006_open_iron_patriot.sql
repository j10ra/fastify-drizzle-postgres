CREATE TABLE IF NOT EXISTS "BusinessProfiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"about" text,
	"address" text,
	"isOnboardingDone" boolean,
	"isLive" boolean,
	"isVerified" boolean,
	"createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
	"updatedAat" timestamp DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC')
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "BusinessRoleFunctions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"businessProfileId" uuid NOT NULL,
	"businessRoleId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"isEnabled" boolean,
	"createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
	"updatedAat" timestamp DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC')
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "BusinessRoles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"businessProfileId" uuid NOT NULL,
	"functionName" text,
	"deleted" boolean,
	"createdAt" timestamp DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
	"updatedAat" timestamp DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC')
);
--> statement-breakpoint
ALTER TABLE "Authentication" ADD COLUMN "birthYear" text;--> statement-breakpoint
ALTER TABLE "Authentication" ADD COLUMN "gender" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "BusinessRoleFunctions" ADD CONSTRAINT "BusinessRoleFunctions_businessProfileId_BusinessProfiles_id_fk" FOREIGN KEY ("businessProfileId") REFERENCES "BusinessProfiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "BusinessRoleFunctions" ADD CONSTRAINT "BusinessRoleFunctions_businessRoleId_BusinessRoles_id_fk" FOREIGN KEY ("businessRoleId") REFERENCES "BusinessRoles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "BusinessRoleFunctions" ADD CONSTRAINT "BusinessRoleFunctions_userId_Authentication_id_fk" FOREIGN KEY ("userId") REFERENCES "Authentication"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "BusinessRoles" ADD CONSTRAINT "BusinessRoles_businessProfileId_BusinessProfiles_id_fk" FOREIGN KEY ("businessProfileId") REFERENCES "BusinessProfiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
