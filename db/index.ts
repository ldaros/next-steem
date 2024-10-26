import { Pool } from "pg";

export class DB {
  private static instance: DB;
  private pool: Pool;

  private constructor() {
    const connectionString = process.env.DATABASE_URL;
    this.pool = new Pool({ connectionString });
  }

  public static getInstance(): DB {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance;
  }

  public getPool(): Pool {
    return this.pool;
  }
}

function init() {
  const db = DB.getInstance();

  const query = `

  `;

  db.getPool().query(query);
}
