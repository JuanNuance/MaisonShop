"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/api";
import { Produto } from "@/types";

export function useProducts(
  pagina: number = 1,
  tamanho_pagina: number = 12,
  categoria?: string
) {
  return useQuery({
    queryKey: ["products", pagina, tamanho_pagina, categoria],
    queryFn: () => productService.getAll(pagina, tamanho_pagina, categoria),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getById(id),
    enabled: id > 0,
    staleTime: 1000 * 60 * 5,
  });
}

export function useProductMutations() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (produto: Omit<Produto, "id">) => productService.create(produto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, produto }: { id: number; produto: Partial<Produto> }) =>
      productService.update(id, produto),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => productService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    createProduct: createMutation.mutateAsync,
    updateProduct: updateMutation.mutateAsync,
    deleteProduct: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
