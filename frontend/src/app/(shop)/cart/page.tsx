"use client";

import Link from "next/link";
import Container from "@/components/common/Container";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const total = getTotal();

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <nav className="font-sans text-xs text-stone-400 mb-4 flex gap-1.5">
          <a href="/" className="hover:text-stone-700 transition-colors">
            Início
          </a>
          <span>/</span>
          <span className="text-stone-700">Carrinho</span>
        </nav>

        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 mb-10">
          Seu Carrinho
        </h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-20 h-20 text-stone-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <p className="font-sans text-lg text-stone-500">
              Seu carrinho está vazio
            </p>
            <Link href="/products">
              <Button variant="outline">Explorar Produtos</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-sm text-stone-500">
                  {items.length} ite{items.length > 1 ? "ns" : "m"}
                </span>
                <button
                  onClick={clearCart}
                  className="font-sans text-sm text-stone-400 hover:text-red-500 transition-colors duration-300"
                >
                  Limpar Carrinho
                </button>
              </div>
              <div className="border-t border-stone-100">
                {items.map((item) => (
                  <CartItem key={item.produto_id} item={item} />
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="lg:sticky lg:top-28 bg-stone-50 rounded-md p-6 flex flex-col gap-6">
                <h2 className="font-serif text-lg font-semibold text-stone-900">
                  Resumo do Pedido
                </h2>
                <CartSummary subtotal={total} />
                <Link href="/checkout">
                  <Button className="w-full" size="lg">
                    Finalizar Compra
                  </Button>
                </Link>
                <Link
                  href="/products"
                  className="font-sans text-sm text-center text-stone-500 hover:text-stone-800 transition-colors"
                >
                  Continuar Comprando
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
