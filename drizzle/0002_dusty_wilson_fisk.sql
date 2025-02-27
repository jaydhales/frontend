CREATE TABLE "apr_rates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"feedback" text NOT NULL,
	"timestamp" integer NOT NULL
);
--> statement-breakpoint
DROP TABLE "aprs" CASCADE;