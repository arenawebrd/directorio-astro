import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  host: import.meta.env.POSTGRES_HOST,
  port: Number(import.meta.env.POSTGRES_PORT),
  user: import.meta.env.POSTGRES_USER,
  password: import.meta.env.POSTGRES_PASSWORD,
  database: import.meta.env.POSTGRES_DATABASE,
});

export default pool;
