"use client";

import Container from "@/components/common/Container";
import AdminProductList from "@/components/product/AdminProductList";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function AdminProductsPage() {
  return (
    <section className="py-12 sm:py-16 animate-fade-in">
      <Container>
        <div className="mb-10">
          <Link href="/dashboard/admin" className="text-sm font-sans text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-2 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Voltar para o Painel
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900">
            Gerenciamento de Produtos
          </h1>
        </div>

        <AdminProductList />
      </Container>
    </section>
  );
}
