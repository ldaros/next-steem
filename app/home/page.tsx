"use client";

import { Catalog } from "@/components/Catalog";
import { Footer } from "@/components/Footer";
import { Title } from "@/components/Title";
import { Header } from "@/components/Header";
import { Layout } from "@/components/Layout";
import { CartProvider } from "@/contexts/CartContext";

export default function Home() {
  return (
    <CartProvider>
      <Layout cart={true}>
        <Title title="Catalogo" />
        <Catalog />
      </Layout>
    </CartProvider>
  );
}
