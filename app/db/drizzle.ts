import { drizzle } from "drizzle-orm/pglite";
// import postgres from 'postgres';
import dotenv from "dotenv";
import { PGlite } from "@electric-sql/pglite";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

export const client = new PGlite(process.env.DATABASE_URL!);
export const db = drizzle({ client });
