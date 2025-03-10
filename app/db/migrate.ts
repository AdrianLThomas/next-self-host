import dotenv from "dotenv";
import path from "path";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./drizzle";

dotenv.config();

async function main() {
  await migrate(db, {
    migrationsFolder: path.join(process.cwd(), "./app/db/migrations"),
  });
  console.log(`Migrations complete`);
  // await client.end();
}

main();
