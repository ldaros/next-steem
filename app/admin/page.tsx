import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, ShoppingCart, DollarSign } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Title } from "@/components/Title";
import { DB } from "@/db";

export default async function AdminDashboard() {
  "use server";
  const db = DB.getInstance();
  const pool = db.getPool();

  const query = `
    SELECT * FROM orders
  `;

  const { rows } = await pool.query(query);

  const recentOrders = rows.map((order) => ({
    id: order.id,
    customer: order.client,
    product: order.product,
    total: order.total,
    status: order.status,
  }));

  const totalOrders = rows.length;

  const totalRevenue = rows.reduce((sum, order) => sum + order.total, 0);

  const query2 = `
    SELECT COUNT(*) FROM users
  `;

  const { rows: users } = await pool.query(query2);

  const totalUsers = users[0].count;

  return (
    <Layout>
      <Title title="Dashboard" />

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <Card className="bg-neutral-800 border-neutral-700 text-neutral-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita total</CardTitle>
            <DollarSign className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalRevenue / 100}</div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-800 border-neutral-700 text-neutral-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas</CardTitle>
            <ShoppingCart className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-800 border-neutral-700 text-neutral-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários</CardTitle>
            <Users className="h-4 w-4 text-neutral-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card className="bg-neutral-800 border-neutral-700 text-neutral-100">
        <CardHeader>
          <CardTitle>Pedidos recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>R$ {order.total / 100}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Layout>
  );
}
