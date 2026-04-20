"use client";

import Image from "next/image";
import Link from "next/link";
import type { Produto } from "@/types";
import { formatPrice } from "@/utils/format";
import { useCartStore } from "@/store/cartStore";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

interface ProductCardProps {
  produto: Produto;
}

export default function ProductCard({ produto }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(produto, 1);
  };

  const isOutOfStock = produto.estoque <= 0;

  return (
    <Card hover className="overflow-hidden group">
      <Link href={`/products/${produto.id}`} className="flex flex-col h-full">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
          <Image
            src={produto.imagem_url || "/placeholder-product.svg"}
            alt={produto.nome}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-600 ease-in-out group-hover:scale-105"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTdlNWU0Ii8+PC9zdmc+"
          />
          {isOutOfStock && (
            <div className="absolute top-3 left-3">
              <Badge variant="danger">Esgotado</Badge>
            </div>
          )}
          {!isOutOfStock && produto.preco_promocional && (
            <div className="absolute top-3 left-3">
              <Badge variant="warning">Promoção</Badge>
            </div>
          )}
          {produto.categoria && !isOutOfStock && !produto.preco_promocional && (
            <div className="absolute top-3 left-3">
              <Badge variant="default">{produto.categoria}</Badge>
            </div>
          )}

          {/* Quick Add Button */}
          {!isOutOfStock && (
            <button
              onClick={handleAddToCart}
              className="
                absolute bottom-3 right-3
                bg-white/90 backdrop-blur-sm text-stone-800
                p-2.5 rounded-full shadow-sm
                opacity-0 translate-y-2
                group-hover:opacity-100 group-hover:translate-y-0
                transition-all duration-400 ease-in-out
                hover:bg-stone-900 hover:text-white
              "
              aria-label="Adicionar ao carrinho"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1.5 p-4">
          <h3 className="font-sans text-sm font-medium text-stone-800 line-clamp-1">
            {produto.nome}
          </h3>
          <p className="font-sans text-xs text-stone-400 line-clamp-1">
            {produto.descricao}
          </p>
          <div className="flex items-center gap-2 mt-1">
            {produto.preco_promocional ? (
              <>
                <span className="font-serif text-base font-bold text-red-600">
                  {formatPrice(produto.preco_promocional)}
                </span>
                <span className="font-sans text-xs text-stone-400 line-through">
                  {formatPrice(produto.preco)}
                </span>
              </>
            ) : (
              <span className="font-serif text-base font-semibold text-stone-900">
                {formatPrice(produto.preco)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </Card>
  );
}
