import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { Category } from "@/types";
import { DB } from "@/db";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const deleteCategory = async (id: number) => {
  "use server";
  try {
    const db = DB.getInstance();
    const pool = db.getPool();
    const query = "DELETE FROM categories WHERE id = $1";
    await pool.query(query, [id]);
    revalidatePath("/admin/category");
    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, error: "Failed to delete category" };
  }
};

export default async function CategoryPage() {
  const db = DB.getInstance();
  const pool = db.getPool();

  let categories: Category[] = [];
  let error: string | null = null;

  try {
    const query = "SELECT * FROM categories ORDER BY name ASC";
    const { rows } = await pool.query<Category>(query);
    categories = rows.map((row) => ({
      id: row.id,
      name: row.name,
    }));
  } catch (err) {
    console.error("Error fetching categories:", err);
    error = "Failed to fetch categories. Please try again later.";
  }

  return (
    <Layout>
      <Card className="bg-neutral-800 border-neutral-700 text-neutral-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Actions</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category: Category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Link href={`/admin/category/${category.id}`}>
                        <Button variant="outline" size="sm">
                          <PencilIcon className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </Link>
                      {/* @ts-ignore */}
                      <form action={deleteCategory.bind(null, category.id)}>
                        <Button variant="destructive" size="sm" type="submit">
                          <TrashIcon className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </form>
                    </div>
                  </TableCell>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-6">
            <Link href={`/admin/category/0`}>
              <Button>
                <PlusIcon className="h-4 w-4 mr-1" /> New Category
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
