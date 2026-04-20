"use client";

import { useState, useMemo } from "react";
import Container from "@/components/common/Container";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFilters from "@/components/product/ProductFilters";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import { useProducts } from "@/hooks/useProducts";
import type { Produto } from "@/types";

const CATEGORIAS_EXEMPLO = [
  "Decoração",
  "Vestuário",
  "Acessórios",
  "Casa",
  "Beleza",
];

export default function ProductsPage() {
  const [categoria, setCategoria] = useState("");
  const [ordenacao, setOrdenacao] = useState("");
  const [pagina, setPagina] = useState(1);

  const { data, isLoading } = useProducts(pagina, 12, categoria || undefined);

  const sortedProducts = useMemo(() => {
    if (!data?.items) return [];
    const items = [...data.items];

    switch (ordenacao) {
      case "preco_asc":
        return items.sort((a, b) => a.preco - b.preco);
      case "preco_desc":
        return items.sort((a, b) => b.preco - a.preco);
      case "nome_asc":
        return items.sort((a, b) => a.nome.localeCompare(b.nome));
      case "nome_desc":
        return items.sort((a, b) => b.nome.localeCompare(a.nome));
      default:
        return items;
    }
  }, [data?.items, ordenacao]);

  const totalPages = data ? Math.ceil(data.total / data.tamanho_pagina) : 0;

  return (
    <section className="py-12 sm:py-16">
      <Container>
        {/* Header */}
        <div className="mb-10">
          <nav className="font-sans text-xs text-stone-400 mb-4 flex gap-1.5">
            <a href="/" className="hover:text-stone-700 transition-colors">
              Início
            </a>
            <span>/</span>
            <span className="text-stone-700">Produtos</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900">
            Nossos Produtos
          </h1>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters  */}
          <aside className="w-full lg:w-56 flex-shrink-0">
            <div className="lg:sticky lg:top-28">
              <ProductFilters
                categorias={CATEGORIAS_EXEMPLO}
                categoriaAtiva={categoria}
                onCategoriaChange={(cat) => {
                  setCategoria(cat);
                  setPagina(1);
                }}
                ordenacao={ordenacao}
                onOrdenacaoChange={setOrdenacao}
              />
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {data && (
              <p className="font-sans text-sm text-stone-500 mb-6">
                {data.total} produto{data.total !== 1 ? "s" : ""} encontrado
                {data.total !== 1 ? "s" : ""}
              </p>
            )}

            {isLoading ? (
              <ProductGridSkeleton count={12} />
            ) : (
              <ProductGrid produtos={sortedProducts} />
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-14">
                <button
                  onClick={() => setPagina((p) => Math.max(1, p - 1))}
                  disabled={pagina === 1}
                  className="px-4 py-2 font-sans text-sm text-stone-600 border border-stone-200 rounded-md hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Anterior
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => setPagina(p)}
                      className={`
                        w-10 h-10 font-sans text-sm rounded-md transition-all duration-300
                        ${
                          p === pagina
                            ? "bg-stone-900 text-white"
                            : "text-stone-600 hover:bg-stone-100"
                        }
                      `}
                    >
                      {p}
                    </button>
                  )
                )}
                <button
                  onClick={() => setPagina((p) => Math.min(totalPages, p + 1))}
                  disabled={pagina === totalPages}
                  className="px-4 py-2 font-sans text-sm text-stone-600 border border-stone-200 rounded-md hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
                >
                  Próximo
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
