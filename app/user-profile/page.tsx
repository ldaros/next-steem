import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { jwtDecode } from 'jwt-decode'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Layout } from "@/components/Layout"
import { Title } from "@/components/Title"
import { DB } from "@/db"
import { revalidatePath } from "next/cache"

async function getUserIdFromCookie() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')

  if (!token) {
    redirect('/login')
  }

  try {
    const decoded: any = jwtDecode(token.value)
    console.log("Token decoded:", decoded)

    return decoded.id
  } catch (error) {
    console.error('Error verifying token:', error)
    redirect('/login')
  }
}

async function updateUserInfo(formData: FormData) {
  'use server'
  const userId = await getUserIdFromCookie()
  
  const db = DB.getInstance()
  const pool = db.getPool()
  
  const newName = formData.get('name') as string
  const newPassword = formData.get('password') as string
  
  const query = `
    UPDATE users
    SET name = $1, password = $2
    WHERE id = $3
  `
  
  await pool.query(query, [newName, newPassword, userId])
  revalidatePath('/user-profile')
}

async function getUserData() {
  const userId = await getUserIdFromCookie()
  
  const db = DB.getInstance()
  const pool = db.getPool()
  
  const userQuery = `
    SELECT name, password, username FROM users WHERE id = $1
  `
  const { rows: [user] } = await pool.query(userQuery, [userId])
  
  const ordersQuery = `
    SELECT o.id, p.name as product, o.total, o.status, p.price
    FROM orders o
    JOIN products p ON o.product_id = p.id
    WHERE o.client = $1
    ORDER BY o.id DESC
  `
  const { rows: orders } = await pool.query(ordersQuery, [user.username])
  
  return { user, orders }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function UserProfile() {
  const { user, orders } = await getUserData()

  const hiddenPassword = user.password.replace(/./g, '*')

  return (
    <Layout>
      <Title title="Perfil do Usuário" />

      <div className="grid gap-6 mb-8">
        <Card className="bg-neutral-800 border-neutral-700 text-neutral-100">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={updateUserInfo} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Nome
                </label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={user.name}
                  className="bg-neutral-700 border-neutral-600 text-neutral-100 mb-4"
                />
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Senha
                </label>
                <Input
                  id="password"
                  name="password"
                  defaultValue={hiddenPassword}
                  className="bg-neutral-700 border-neutral-600 text-neutral-100"
                />
              </div>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                Atualizar Informações
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-neutral-800 border-neutral-700 text-neutral-100">
          <CardHeader>
            <CardTitle>Histórico de Compras</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Pedido ID</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Preço Unitário</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell>R$ {order.price / 100}</TableCell>
                    <TableCell>R$ {order.total / 100}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}