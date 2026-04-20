"use client";

import { useState, useEffect } from "react";
import { Produto } from "@/types";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

interface ProductFormProps {
  initialData?: Produto;
  onSubmit: (data: Omit<Produto, "id">) => void;
  isLoading?: boolean;
  title: string;
}

export default function ProductForm({
  initialData,
  onSubmit,
  isLoading,
  title,
}: ProductFormProps) {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: 0,
    estoque: 0,
    categoria: "",
    imagem_url: "",
    preco_promocional: null as number | null,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nome: initialData.nome,
        descricao: initialData.descricao || "",
        preco: initialData.preco,
        estoque: initialData.estoque,
        categoria: initialData.categoria || "",
        imagem_url: initialData.imagem_url || "",
        preco_promocional: initialData.preco_promocional,
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) || 0 : value,
    }));
  };

  const handlePricePromocionalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      preco_promocional: value === "" ? null : parseFloat(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-6">
        {title}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Nome do Produto"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-sans font-medium text-stone-700">
            Descrição
          </label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            className="w-full px-4 py-3 font-sans text-stone-900 bg-white border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-all duration-300 min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Preço (R$)"
            name="preco"
            type="number"
            step="0.01"
            value={formData.preco}
            onChange={handleChange}
            required
          />
          <Input
            label="Preço Promocional (R$)"
            name="preco_promocional"
            type="number"
            step="0.01"
            value={formData.preco_promocional ?? ""}
            onChange={handlePricePromocionalChange}
            placeholder="Opcional"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Estoque"
            name="estoque"
            type="number"
            value={formData.estoque}
            onChange={handleChange}
            required
          />
          <Input
            label="Categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
          />
        </div>

        <Input
          label="URL da Imagem"
          name="imagem_url"
          value={formData.imagem_url}
          onChange={handleChange}
          placeholder="https://exemplo.com/imagem.jpg"
        />

        {formData.imagem_url && (
          <div className="mt-2">
            <p className="text-xs text-stone-500 mb-1 uppercase tracking-wider">Pré-visualização:</p>
            <div className="w-32 h-32 rounded-md overflow-hidden border border-stone-200">
              <img 
                src={formData.imagem_url} 
                alt="Preview" 
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = "/placeholder-product.svg")}
              />
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.history.back()}
          >
            Cancelar
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Salvar Produto
          </Button>
        </div>
      </form>
    </Card>
  );
}
