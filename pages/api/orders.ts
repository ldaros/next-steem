import { NextApiRequest, NextApiResponse } from "next";
import { Order } from "@/types";
import jwt from "jsonwebtoken";
import { CartItem } from "@/types";
import { DB } from "@/db";
import { jwtDecode } from "jwt-decode";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Order[] | { message: string }>
) {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    jwt.verify(token, "secret");
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const username = jwtDecode<any>(token).username;
  const { items }: { items: CartItem[] } = await req.body;

  const orders: Order[] = items.map((item) => ({
    id: item.id,
    client: username,
    product: item.name,
    total: item.price,
    status: "Pending",
  }));

  const db = DB.getInstance();
  const pool = db.getPool();

  for (const order of orders) {
    const query = `
      INSERT INTO orders (product_id, client, product, total, status)
      VALUES ($1, $2, $3, $4, $5)
    `;

    await pool.query(query, [order.id, order.client, order.product, order.total, order.status]);
  }

  res.status(200).json(orders);
}
