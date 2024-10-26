import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Category } from "@/types";
import { SaveIcon } from "lucide-react";
import { Layout } from "@/components/Layout";
import { DB } from "@/db";

async function getCategory(id: number): Promise<Category | null> {
  if (id === 0) {
    return { id: 0, name: "" };
  }

  const db = DB.getInstance();
  const pool = db.getPool();
  const query = "SELECT * FROM categories WHERE id = $1";
  const { rows } = await pool.query<Category>(query, [id]);
  return rows[0] || null;
}

async function saveCategory(id: number, name: string) {
  const db = DB.getInstance();
  const pool = db.getPool();

  if (id === 0) {
    const query = "INSERT INTO categories (name) VALUES ($1) RETURNING id";
    const result = await pool.query(query, [name]);
    return result.rows[0].id;
  } else {
    const query = "UPDATE categories SET name = $1 WHERE id = $2";
    await pool.query(query, [name, id]);
    return id;
  }
}

export default async function CategoryFormPage({
  params,
}: {
  params: { id: string };
}) {
  const categoryId = parseInt(params.id, 10);
  const category = await getCategory(categoryId);

  if (!category) {
    redirect("/admin/category");
  }

  async function handleSave(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    if (!name) {
      throw new Error("Name is required");
    }

    const savedId = await saveCategory(categoryId, name);
    revalidatePath("/admin/category");
    redirect("/admin/category");
  }

  return (
    // center content to middle of screen
    <Layout>
      <main className="flex justify-center items-center min-h-screen bg-neutral-900 p-4">
        <Card className="w-full max-w-md bg-neutral-800 border-neutral-700 text-neutral-100">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              {categoryId === 0 ? "Nova Categoria" : "Editar Categoria"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form action={handleSave} className="space-y-4">
              <div>
                <Label htmlFor="id">ID</Label>
                <Input
                  id="id"
                  type="number"
                  name="id"
                  value={category.id}
                  readOnly
                />
              </div>

              <div>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  defaultValue={category.name}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
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
