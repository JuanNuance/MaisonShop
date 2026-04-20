"use client";

import { useCartStore } from "@/store/cartStore";
import type { Produto } from "@/types";

export function useCart() {
  const {
    items,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    getTotal,
    getItemCount,
  } = useCartStore();

  const handleAddItem = (produto: Produto, quantidade: number = 1) => {
    addItem(produto, quantidade);
  };

  return {
    items,
    isOpen,
    total: getTotal(),
    itemCount: getItemCount(),
    addItem: handleAddItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
  };
}
