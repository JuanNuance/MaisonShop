import type { Metadata } from "next";
import "@/styles/globals.css";
import Providers from "./providers";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import CartDrawer from "@/components/cart/CartDrawer";

export const metadata: Metadata = {
  title: "Maison — Curadoria Premium",
  description:
    "Produtos cuidadosamente selecionados para quem valoriza qualidade, design e sustentabilidade.",
  keywords: ["e-commerce", "premium", "curadoria", "sustentável", "design"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="font-sans bg-stone-50 text-stone-900 min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
