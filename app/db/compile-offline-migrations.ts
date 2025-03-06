import { readMigrationFiles } from "drizzle-orm/migrator";
import path from "path";

const migrationsFolder = "./app/db/migrations";

const migrations = readMigrationFiles({ migrationsFolder });

await Bun.write(
  path.join(process.cwd(), `${migrationsFolder}/migrations.json`),
  JSON.stringify(migrations)
);

console.log("Migrations compiled!");
