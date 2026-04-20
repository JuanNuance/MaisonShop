"use client";

import { useState } from "react";
import Link from "next/link";
import { useProducts, useProductMutations } from "@/hooks/useProducts";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Skeleton from "@/components/ui/Skeleton";
import { formatPrice } from "@/utils/format";

export default function AdminProductList() {
  const [pagina, setPagina] = useState(1);
  const { data, isLoading } = useProducts(pagina, 10);
  const { deleteProduct, isDeleting } = useProductMutations();

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await deleteProduct(id);
      } catch (error) {
        alert("Erro ao excluir produto");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-4">
              <Skeleton className="w-16 h-16 rounded-md" />
              <div className="flex-1">
                <Skeleton className="w-1/3 h-5 mb-2" />
                <Skeleton className="w-1/4 h-4" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="font-serif text-xl font-semibold text-stone-900">
          Gerenciar Produtos ({data?.total || 0})
        </h2>
        <Link href="/dashboard/admin/products/new">
          <Button size="sm">Novo Produto</Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {data?.items.map((produto) => (
          <Card key={produto.id} className="p-4">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="w-16 h-16 rounded-md overflow-hidden bg-stone-100 flex-shrink-0">
                <img
                  src={produto.imagem_url || "/placeholder-product.svg"}
                  alt={produto.nome}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.currentTarget.src = "/placeholder-product.svg")}
                />
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-sans font-medium text-stone-900">
                  {produto.nome}
                </h3>
                <p className="text-xs text-stone-500 uppercase tracking-wider">
                  {produto.categoria || "Sem categoria"}
                </p>
                <div className="mt-1 flex items-center justify-center sm:justify-start gap-2">
                  <span className={`font-sans font-semibold ${produto.preco_promocional ? "text-stone-400 line-through text-xs" : "text-stone-900"}`}>
                    {formatPrice(produto.preco)}
                  </span>
                  {produto.preco_promocional && (
                    <span className="font-sans font-semibold text-red-600">
                      {formatPrice(produto.preco_promocional)}
                    </span>
                  )}
                  <Badge variant={produto.estoque > 0 ? "default" : "danger"}>
                    {produto.estoque} em estoque
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2">
                <Link href={`/dashboard/admin/products/${produto.id}/edit`}>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => handleDelete(produto.id)}
                  isLoading={isDeleting}
                >
                  Excluir
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {data && data.total > 10 && (
        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={pagina === 1}
            onClick={() => setPagina(pagina - 1)}
          >
            Anterior
          </Button>
          <span className="flex items-center px-4 text-sm font-sans text-stone-600">
            Página {pagina}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={pagina * 10 >= data.total}
            onClick={() => setPagina(pagina + 1)}
          >
            Próxima
          </Button>
        </div>
      )}
    </div>
  );
}
