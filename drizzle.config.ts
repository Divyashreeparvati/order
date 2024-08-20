import { Config } from "drizzle-kit";
import {config} from './src/config/index'

const dbConfig: Config = {
  schema: "./src/db/schema/*", // Specify the schema you're working with
  out:"./src/db/migrations",
  dialect: "postgresql", // The database dialect
  dbCredentials: {
    url: config.DB_URL || "postgres://user:password@localhost:5432/mydb", // Use environment variables for security
  },
  verbose: true, // Enable verbose logging (optional)
  strict: true,  // Enable strict mode for the ORM
};

export default dbConfig;