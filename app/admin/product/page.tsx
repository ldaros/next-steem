import { Suspense } from "react";
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
import { Product } from "@/types";
import { DB } from "@/db";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ITEMS_PER_PAGE = 10;

const deleteProduct = async (id: number) => {
  "use server";
  try {
    const db = DB.getInstance();
    const pool = db.getPool();
    const query = "DELETE FROM products WHERE id = $1";
    await pool.query(query, [id]);
    revalidatePath("/admin/product");
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "Failed to delete product" };
  }
};

async function getProducts(page: number) {
  const db = DB.getInstance();
  const pool = db.getPool();
  const offset = (page - 1) * ITEMS_PER_PAGE;
  const query = `
    SELECT p.*, c.name AS category_name 
    FROM products p 
    INNER JOIN categories c ON p.category_id = c.id 
    ORDER BY p.name ASC 
    LIMIT $1 OFFSET $2
  `;
  const countQuery = "SELECT COUNT(*) FROM products";

  try {
    const [productsResult, countResult] = await Promise.all([
      pool.query<Product>(query, [ITEMS_PER_PAGE, offset]),
      pool.query(countQuery),
    ]);

    const totalItems = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    return {
      products: productsResult.rows,
      totalPages,
      currentPage: page,
    };
  } catch (err) {
    console.error("Error fetching products:", err);
    throw new Error("Failed to fetch products");
  }
}

function ProductTable({ products }: { products: Product[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Actions</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product: Product) => (
          <TableRow key={product.id}>
            <TableCell>
              <div className="flex space-x-2">
                <Link href={`/admin/product/${product.id}`}>
                  <Button variant="outline" size="sm">
                    <PencilIcon className="h-4 w-4 mr-1" /> Edit
                  </Button>
                </Link>
                {/* @ts-ignore */}
                <form action={deleteProduct.bind(null, product.id)}>
                  <Button variant="destructive" size="sm" type="submit">
                    <TrashIcon className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </form>
              </div>
            </TableCell>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>R$ {(product.price / 100).toFixed(2)}</TableCell>
            <TableCell>{product.category_name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function Pagination({
  totalPages,
  currentPage,
}: {
  totalPages: number;
  currentPage: number;
}) {
  return (
    <div className="flex justify-center space-x-2 mt-4">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link key={page} href={`/admin/product?page=${page}`}>
          <Button
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
          >
            {page}
          </Button>
        </Link>
      ))}
    </div>
  );
}

export default async function ProductPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1");
  let productData;
  let error: string | null = null;

  try {
    productData = await getProducts(page);
  } catch (err) {
    error = "Failed to fetch products. Please try again later.";
  }

  return (
    <Layout>
      <Card className="bg-neutral-800 border-neutral-700 text-neutral-100">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Products</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Suspense fallback={<div>Loading...</div>}>
            {productData && (
              <>
                <ProductTable products={productData.products} />
                <Pagination
                  totalPages={productData.totalPages}
                  currentPage={productData.currentPage}
                />
              </>
            )}
          </Suspense>
          <div className="mt-6">
            <Link href={`/admin/product/0`}>
              <Button>
                <PlusIcon className="h-4 w-4 mr-1" /> New Product
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
}
