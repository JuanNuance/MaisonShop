"use client";

import Image from "next/image";
import type { CarrinhoItem } from "@/types";
import { formatPrice } from "@/utils/format";
import { useCartStore } from "@/store/cartStore";

interface CartItemProps {
  item: CarrinhoItem;
}

export default function CartItem({ item }: CartItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div className="flex gap-4 py-4 border-b border-stone-100 last:border-0">
      {/* Image */}
      <div className="relative w-20 h-20 bg-stone-100 rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={item.produto.imagem_url || "/placeholder-product.svg"}
          alt={item.produto.nome}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 min-w-0 gap-1">
        <h4 className="font-sans text-sm font-medium text-stone-800 truncate">
          {item.produto.nome}
        </h4>
        <div className="flex items-center gap-2">
          {item.produto.preco_promocional ? (
            <>
              <span className="font-serif text-sm font-bold text-red-600">
                {formatPrice(item.produto.preco_promocional)}
              </span>
              <span className="font-sans text-xs text-stone-400 line-through">
                {formatPrice(item.produto.preco)}
              </span>
            </>
          ) : (
            <p className="font-serif text-sm font-semibold text-stone-900">
              {formatPrice(item.produto.preco)}
            </p>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-1">
          <div className="flex items-center border border-stone-200 rounded-md">
            <button
              onClick={() =>
                updateQuantity(item.produto_id, item.quantidade - 1)
              }
              className="px-2.5 py-1 text-stone-500 hover:text-stone-800 transition-colors duration-300"
              aria-label="Diminuir quantidade"
            >
              −
            </button>
            <span className="px-3 py-1 font-sans text-sm text-stone-800 min-w-[2rem] text-center">
              {item.quantidade}
            </span>
            <button
              onClick={() =>
                updateQuantity(item.produto_id, item.quantidade + 1)
              }
              className="px-2.5 py-1 text-stone-500 hover:text-stone-800 transition-colors duration-300"
              aria-label="Aumentar quantidade"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeItem(item.produto_id)}
            className="text-stone-400 hover:text-red-500 transition-colors duration-300 ml-auto"
            aria-label="Remover item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
