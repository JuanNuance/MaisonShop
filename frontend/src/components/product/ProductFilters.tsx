"use client";

interface ProductFiltersProps {
  categorias: string[];
  categoriaAtiva: string;
  onCategoriaChange: (categoria: string) => void;
  ordenacao: string;
  onOrdenacaoChange: (ordenacao: string) => void;
}

export default function ProductFilters({
  categorias,
  categoriaAtiva,
  onCategoriaChange,
  ordenacao,
  onOrdenacaoChange,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* Categories */}
      <div className="flex flex-col gap-3">
        <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-stone-500">
          Categorias
        </h3>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => onCategoriaChange("")}
            className={`
              text-left px-3 py-2 rounded font-sans text-sm
              transition-all duration-300
              ${
                categoriaAtiva === ""
                  ? "bg-stone-900 text-stone-50 font-medium"
                  : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
              }
            `}
          >
            Todos
          </button>
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoriaChange(cat)}
              className={`
                text-left px-3 py-2 rounded font-sans text-sm capitalize
                transition-all duration-300
                ${
                  categoriaAtiva === cat
                    ? "bg-stone-900 text-stone-50 font-medium"
                    : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className="flex flex-col gap-3">
        <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-stone-500">
          Ordenar por
        </h3>
        <select
          value={ordenacao}
          onChange={(e) => onOrdenacaoChange(e.target.value)}
          className="
            w-full px-3 py-2.5 font-sans text-sm text-stone-700
            bg-white border border-stone-200 rounded-md
            focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent
            transition-all duration-300 cursor-pointer
          "
        >
          <option value="">Relevância</option>
          <option value="preco_asc">Menor Preço</option>
          <option value="preco_desc">Maior Preço</option>
          <option value="nome_asc">A - Z</option>
          <option value="nome_desc">Z - A</option>
        </select>
      </div>
    </div>
  );
}
