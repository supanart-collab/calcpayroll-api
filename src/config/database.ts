import { Pool } from 'pg';

const pool = new Pool({
  host: 'ep-lucky-salad-a1ktonpy-pooler.ap-southeast-1.aws.neon.tech',
  port: 5432,
  user: 'neondb_owner',
  password: 'npg_QsyYN07bfmFJ',
  database: 'PG_Exam',
  ssl: {
    rejectUnauthorized: false
  },
  idleTimeoutMillis: 0,
  keepAlive: true
});

export default pool;