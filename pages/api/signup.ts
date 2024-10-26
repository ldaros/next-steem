import type { NextApiRequest, NextApiResponse } from "next";
import { DB } from "@/db";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, username, password } = req.body;

  const db = DB.getInstance();
  const pool = db.getPool();

  if ( !name || !username || !password) {
    res.status(400).json({ message: "Username and password are required" });
    return;
  }

  const query = `
    SELECT (username, password)
    FROM users
    WHERE username = $1 AND password = $2
  `;

  const { rows } = await pool.query(query, [username, password]);

  if (rows.length > 0) {
    res.status(401).json({ message: "Username or password already exists" });
    return;
  }

  const token = jwt.sign({ name, username, role: "USER" }, "secret");

  const query2 = `
    INSERT INTO users (name, username, password, role)
    VALUES ($1, $2, $3, $4)
  `;

  await pool.query(query2, [name, username, password, "USER"]);

  res.status(200).json({ token });
}
