"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Container from "@/components/common/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Skeleton from "@/components/ui/Skeleton";
import { useProduct } from "@/hooks/useProducts";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/utils/format";

export default function ProductDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const { data: produto, isLoading, error } = useProduct(id);
  const addItem = useCartStore((s) => s.addItem);
  const [quantidade, setQuantidade] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  const handleAddToCart = () => {
    if (!produto) return;
    addItem(produto, quantidade);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  if (error) {
    return (
      <section className="py-20">
        <Container>
          <div className="flex flex-col items-center gap-4">
            <p className="font-sans text-stone-500 text-lg">
              Produto não encontrado.
            </p>
            <a href="/products" className="font-sans text-sage-600 hover:underline">
              Voltar aos produtos
            </a>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16">
      <Container>
        {/* Breadcrumbs */}
        <nav className="font-sans text-xs text-stone-400 mb-8 flex gap-1.5">
          <a href="/" className="hover:text-stone-700 transition-colors">
            Início
          </a>
          <span>/</span>
          <a href="/products" className="hover:text-stone-700 transition-colors">
            Produtos
          </a>
          <span>/</span>
          <span className="text-stone-700">
            {isLoading ? "..." : produto?.nome}
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="flex-1 max-w-2xl">
            {isLoading ? (
              <Skeleton variant="card" className="aspect-square" />
            ) : (
              <div className="relative aspect-square bg-stone-100 rounded-md overflow-hidden">
                <Image
                  src={produto?.imagem_url || "/placeholder-product.svg"}
                  alt={produto?.nome || "Produto"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTdlNWU0Ii8+PC9zdmc+"
                />
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col gap-6 max-w-lg">
            {isLoading ? (
              <div className="flex flex-col gap-4">
                <Skeleton className="w-1/3 h-3" />
                <Skeleton className="w-3/4 h-8" />
                <Skeleton className="w-1/4 h-6" />
                <Skeleton className="w-full h-20" />
              </div>
            ) : produto ? (
              <>
                {/* Category */}
                {produto.categoria && (
                  <Badge variant="default">{produto.categoria}</Badge>
                )}

                {/* Name */}
                <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900">
                  {produto.nome}
                </h1>

                {/* Price */}
                <p className="font-serif text-2xl font-bold text-stone-900">
                  {formatPrice(produto.preco)}
                </p>

                {/* Description */}
                <p className="font-sans text-stone-600 leading-relaxed">
                  {produto.descricao}
                </p>

                {/* Stock */}
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      produto.estoque > 0 ? "bg-sage-500" : "bg-red-400"
                    }`}
                  />
                  <span className="font-sans text-sm text-stone-500">
                    {produto.estoque > 0
                      ? `${produto.estoque} em estoque`
                      : "Esgotado"}
                  </span>
                </div>

                {/* Divider */}
                <div className="border-t border-stone-100" />

                {/* Quantity Selector */}
                {produto.estoque > 0 && (
                  <div className="flex flex-col gap-3">
                    <label className="font-sans text-sm font-medium text-stone-700">
                      Quantidade
                    </label>
                    <div className="flex items-center border border-stone-200 rounded-md w-fit">
                      <button
                        onClick={() =>
                          setQuantidade((q) => Math.max(1, q - 1))
                        }
                        className="px-4 py-3 text-stone-500 hover:text-stone-800 transition-colors duration-300"
                      >
                        −
                      </button>
                      <span className="px-6 py-3 font-sans text-base text-stone-800 min-w-[3rem] text-center border-x border-stone-200">
                        {quantidade}
                      </span>
                      <button
                        onClick={() =>
                          setQuantidade((q) =>
                            Math.min(produto.estoque, q + 1)
                          )
                        }
                        className="px-4 py-3 text-stone-500 hover:text-stone-800 transition-colors duration-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                {/* Add to Cart */}
                <Button
                  size="lg"
                  className="w-full mt-2"
                  onClick={handleAddToCart}
                  disabled={produto.estoque <= 0}
                >
                  {addedFeedback
                    ? "✓ Adicionado ao Carrinho!"
                    : produto.estoque <= 0
                    ? "Produto Esgotado"
                    : "Adicionar ao Carrinho"}
                </Button>

                {/* Extra Info */}
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-stone-100">
                  <div className="flex items-center gap-3 font-sans text-sm text-stone-500">
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
                        d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                      />
                    </svg>
                    Frete grátis para compras acima de R$ 299
                  </div>
                  <div className="flex items-center gap-3 font-sans text-sm text-stone-500">
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
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182"
                      />
                    </svg>
                    Trocas e devoluções em até 30 dias
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
