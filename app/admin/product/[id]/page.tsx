import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Category, Product } from "@/types";
import { SaveIcon } from "lucide-react";
import { Layout } from "@/components/Layout";
import { DB } from "@/db";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

async function getProduct(id: number): Promise<Product> {
  if (id === 0) {
    return { id: 0, category_id: 0, name: "", description: "", price: 0 };
  }

  const db = DB.getInstance();
  const pool = db.getPool();
  const query = "SELECT * FROM products WHERE id = $1";
  const { rows } = await pool.query<Product>(query, [id]);
  return (
    rows[0] || { id: 0, category_id: 0, name: "", description: "", price: 0 }
  );
}

async function getCategories(): Promise<Category[]> {
  const db = DB.getInstance();
  const pool = db.getPool();
  const query = "SELECT * FROM categories";
  const { rows } = await pool.query<Category>(query);
  return rows;
}

async function saveProduct(formData: FormData) {
  "use server";
  let id = parseInt(formData.get("id") as string, 10);
  const name = formData.get("name") as string;
  const price = parseInt(formData.get("price") as string, 10);
  const description = formData.get("description") as string;
  const category_id = parseInt(formData.get("category") as string, 10);

  if (!name || !price || !description || !category_id) {
    throw new Error("All fields are required");
  }

  const db = DB.getInstance();
  const pool = db.getPool();

  if (id === 0) {
    const query =
      "INSERT INTO products (name, price, description, category_id) VALUES ($1, $2, $3, $4) RETURNING id";
    const result = await pool.query(query, [
      name,
      price,
      description,
      category_id,
    ]);
    id = result.rows[0].id;
  } else {
    const query =
      "UPDATE products SET name = $1, price = $2, description = $3, category_id = $4 WHERE id = $5";
    await pool.query(query, [name, price, description, category_id, id]);
  }

  revalidatePath("/admin/product");
  redirect("/admin/product");
}

export default async function ProductFormPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = parseInt(params.id, 10);
  const product = await getProduct(productId);
  const categories = await getCategories();

  return (
    <Layout>
      <main className="flex justify-center items-center min-h-screen bg-neutral-900 p-4">
        <Card className="w-full max-w-md bg-neutral-800 border-neutral-700 text-neutral-100">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              {productId === 0 ? "Novo Produto" : "Editar Produto"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action={saveProduct} className="space-y-4">
              <input type="hidden" name="id" value={product.id} />

              <div>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  defaultValue={product.name}
                  required
                  className="bg-neutral-700 text-neutral-100 border-neutral-600"
                />
              </div>

              <div>
                <Label htmlFor="price">Preço (em centavos)</Label>
                <Input
                  id="price"
                  type="number"
                  name="price"
                  defaultValue={product.price}
                  required
                  className="bg-neutral-700 text-neutral-100 border-neutral-600"
                />
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={product.description}
                  required
                  rows={5}
                  className="bg-neutral-700 text-neutral-100 border-neutral-600"
                />
              </div>

              <div>
                <Label htmlFor="category">Categoria</Label>
                <Select
                  name="category"
                  defaultValue={product.category_id.toString()}
                >
                  <SelectTrigger className="bg-neutral-700 text-neutral-100 border-neutral-600">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-700 text-neutral-100 border-neutral-600">
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-neutral-700 hover:bg-neutral-600"
              >
                <SaveIcon className="w-4 h-4 mr-2" />
                Salvar
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </Layout>
  );
}
