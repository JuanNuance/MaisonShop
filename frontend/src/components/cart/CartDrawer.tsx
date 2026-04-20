"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import Button from "@/components/ui/Button";

export default function CartDrawer() {
  const { items, isOpen, closeCart, getTotal } = useCartStore();

  return (
    <>
      {/* Overlay */}
      <div
        className={`
          fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]
          transition-opacity duration-400
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[70]
          shadow-2xl flex flex-col
          transition-transform duration-400 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <h2 className="font-serif text-xl font-semibold text-stone-900">
            Carrinho
          </h2>
          <button
            onClick={closeCart}
            className="text-stone-400 hover:text-stone-800 transition-colors duration-300 p-1"
            aria-label="Fechar carrinho"
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
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="currentColor"
                className="w-16 h-16 text-stone-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <p className="font-sans text-stone-400">
                Seu carrinho está vazio
              </p>
              <Button variant="outline" size="sm" onClick={closeCart}>
                Continuar Comprando
              </Button>
            </div>
          ) : (
            <div className="py-2">
              {items.map((item) => (
                <CartItem key={item.produto_id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-stone-100 flex flex-col gap-4">
            <CartSummary subtotal={getTotal()} />
            <Link href="/checkout" onClick={closeCart}>
              <Button className="w-full" size="lg">
                Finalizar Compra
              </Button>
            </Link>
            <button
              onClick={closeCart}
              className="font-sans text-sm text-stone-500 hover:text-stone-800 text-center transition-colors duration-300"
            >
              Continuar Comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}
