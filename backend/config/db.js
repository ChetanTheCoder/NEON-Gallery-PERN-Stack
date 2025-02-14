import { neon } from "@neondatabase/serverless";

import dotenv from "dotenv";

dotenv.config();

const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD } = process.env;

//this create a sql connection string using env file
export const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}/neondb?sslmode=require`
);


// postgresql://neondb_owner:npg_gnGSdrf7t6Ie@ep-cold-firefly-a8krxkrs-pooler.eastus2.azure.neon.tech/neondb?sslmode=require

//this sql function is used to connect to the database safely
