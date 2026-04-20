import type { Produto } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  produtos: Produto[];
}

export default function ProductGrid({ produtos }: ProductGridProps) {
  if (produtos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
          className="w-16 h-16 text-stone-300"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <p className="font-sans text-stone-500 text-lg">
          Nenhum produto encontrado.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-6">
      {produtos.map((produto) => (
        <div
          key={produto.id}
          className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
        >
          <ProductCard produto={produto} />
        </div>
      ))}
    </div>
  );
}
