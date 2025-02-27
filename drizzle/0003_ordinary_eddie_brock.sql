CREATE TABLE "last_month_apr" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"apr" text NOT NULL,
	"timestamp" integer NOT NULL,
	CONSTRAINT "last_month_apr_id_unique" UNIQUE("id")
);
