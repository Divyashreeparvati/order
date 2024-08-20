import { Pool } from "pg";
import { config } from "./src/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

async function runMigration() {
  try {
    console.log("migration start...");
    const pool = new Pool({  user: 'order_db',
        host: 'localhost',
        database: 'order_service',
        password: '123456',
        port: 5432});
    const db = drizzle(pool);
    await migrate(db, { migrationsFolder: "./src/db/migrations" });
    console.log("migration was successful!");
    pool.end();
  } catch (err) {
    console.log("migration error", err);
  }
}

runMigration();