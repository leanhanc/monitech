CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar(10) PRIMARY KEY NOT NULL,
	"username" varchar(32) NOT NULL,
	"email" varchar(60),
	"password" varchar(255),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "usernameIndex" ON "users" ("username");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "emailIndex" ON "users" ("email");