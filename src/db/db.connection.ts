import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import { config } from "../config";

const pool = new Pool({
  connectionString: "postgresql://order_db:78910@localhost:5434/order_service",
});

pool.connect()
export const DB: NodePgDatabase<typeof schema> = drizzle(pool, { schema });