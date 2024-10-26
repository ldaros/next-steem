import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout({
  children,
  header = true,
  cart = false,
  footer = true,
}: {
  children: React.ReactNode;
  header?: boolean;
  cart?: boolean;
  footer?: boolean;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-900 text-neutral-200">
      {header && <Header includeCart={cart} />}

      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>

      {footer && <Footer />}
    </div>
  );
}
