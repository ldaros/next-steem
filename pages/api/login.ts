import type { NextApiRequest, NextApiResponse } from "next";
import { DB } from "@/db";
import jwt from "jsonwebtoken";
import { User } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body;

  const db = DB.getInstance();
  const pool = db.getPool();

  const query = `
    SELECT id, username, password, role
    FROM users
    WHERE username = $1 AND password = $2
  `;

  const { rows } = await pool.query<User>(query, [username, password]);

  if (rows.length === 0) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const user: User = rows[0];

  const token = jwt.sign({ id: user.id, username, role: user.role }, "secret");

  res.status(200).json({ token });
}
