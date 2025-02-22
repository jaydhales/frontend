ALTER TABLE "last_month_apr" RENAME TO "current_apr";--> statement-breakpoint
ALTER TABLE "current_apr" DROP CONSTRAINT "last_month_apr_id_unique";--> statement-breakpoint
ALTER TABLE "current_apr" ADD CONSTRAINT "current_apr_id_unique" UNIQUE("id");