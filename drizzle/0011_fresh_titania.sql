ALTER TABLE "apr_rates" RENAME TO "payouts";--> statement-breakpoint
ALTER TABLE "payouts" RENAME COLUMN "apr" TO "sir_in_usd";--> statement-breakpoint
ALTER TABLE "payouts" ADD COLUMN "eth_in_usd" text NOT NULL;