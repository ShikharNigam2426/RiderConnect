import pkg from 'pg';
const { Pool } = pkg; 
import dotenv from 'dotenv'

dotenv.config();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
});

export default pool;