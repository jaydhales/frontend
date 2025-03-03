CREATE TABLE "error_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"error" text NOT NULL,
	"details" text NOT NULL,
	"timestamp" integer NOT NULL,
	"ip" text NOT NULL,
	"user_address" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "payouts" RENAME COLUMN "id" TO "id_";--> statement-breakpoint
CREATE INDEX "ip_index" ON "error_logs" USING btree ("ip");