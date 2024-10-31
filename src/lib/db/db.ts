// import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client/web";
import { env } from "@/env";
// import * as schema from "./schema";
console.log(env.TURSO_DATABASE_URL, env.TURSO_AUTH_TOKEN);
const turso = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});

export const db = turso;
