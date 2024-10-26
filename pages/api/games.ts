import { randomPrice, steamUrlBuilder } from "@/lib/utils";
import { NextApiRequest, NextApiResponse } from "next";
import { Game } from "@/types";
import jwt from "jsonwebtoken";
import { DB } from "@/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Game[] | { message: string }>
) {
  try {
    try {
      const token =
        req.headers.authorization?.split(" ")[1] || req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      jwt.verify(token, "secret");
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Set default values if query params are missing
    const limit = parseInt((req.query.limit as string) || "10", 10);
    const offset = parseInt((req.query.offset as string) || "0", 10);

    const db = DB.getInstance();
    const pool = db.getPool();

    // Query the database for games
    const query = `
      SELECT p.id, p.name, p.description, p.price, p.category_id, c.name AS category
      FROM products p
      JOIN categories c ON p.category_id = c.id
      ORDER BY p.id
      LIMIT $1
      OFFSET $2
    `;
    const { rows } = await pool.query<Game>(query, [limit, offset]);
    const games = rows.map((game) => ({
      id: game.id,
      name: game.name,
      description: game.description,
      price: game.price,
      category: game.category,
      library: steamUrlBuilder.library(game.id.toString()),
      libraryHero: steamUrlBuilder.libraryHero(game.id.toString()),
      logo: steamUrlBuilder.logo(game.id.toString()),
      cover: steamUrlBuilder.cover(game.id.toString()),
    }));

    // Return the games in JSON format
    res.status(200).json(games);
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
