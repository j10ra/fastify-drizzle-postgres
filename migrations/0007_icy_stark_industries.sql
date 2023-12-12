CREATE INDEX IF NOT EXISTS "idIdx" ON "Authentication" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "emailIdx" ON "Authentication" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "refreshTokenIdx" ON "AuthXToken" ("refreshToken");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idIdx" ON "BusinessProfiles" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idIdx" ON "BusinessRoleFunctions" ("id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idIdx" ON "BusinessRoles" ("id");