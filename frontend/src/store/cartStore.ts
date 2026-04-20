"use client";

import { create } from "zustand";
import type { CarrinhoItem, Produto } from "@/types";
import { storage } from "@/utils/storage";

interface CartState {
  items: CarrinhoItem[];
  isOpen: boolean;
  addItem: (produto: Produto, quantidade?: number) => void;
  removeItem: (produtoId: number) => void;
  updateQuantity: (produtoId: number, quantidade: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  hydrate: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (produto, quantidade = 1) => {
    set((state) => {
      const existingIndex = state.items.findIndex(
        (item) => item.produto_id === produto.id
      );

      let newItems: CarrinhoItem[];

      if (existingIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantidade: item.quantidade + quantidade }
            : item
        );
      } else {
        const newItem: CarrinhoItem = {
          id: Date.now(),
          produto_id: produto.id,
          quantidade,
          produto,
        };
        newItems = [...state.items, newItem];
      }

      storage.setItem("cart_items", newItems);
      return { items: newItems, isOpen: true };
    });
  },

  removeItem: (produtoId) => {
    set((state) => {
      const newItems = state.items.filter(
        (item) => item.produto_id !== produtoId
      );
      storage.setItem("cart_items", newItems);
      return { items: newItems };
    });
  },

  updateQuantity: (produtoId, quantidade) => {
    if (quantidade <= 0) {
      get().removeItem(produtoId);
      return;
    }
    set((state) => {
      const newItems = state.items.map((item) =>
        item.produto_id === produtoId ? { ...item, quantidade } : item
      );
      storage.setItem("cart_items", newItems);
      return { items: newItems };
    });
  },

  clearCart: () => {
    storage.removeItem("cart_items");
    set({ items: [] });
  },

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  getTotal: () => {
    return get().items.reduce((total, item) => {
      const preco =
        item.produto.preco_promocional !== null &&
        item.produto.preco_promocional !== undefined
          ? item.produto.preco_promocional
          : item.produto.preco;
      return total + preco * item.quantidade;
    }, 0);
  },

  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantidade, 0);
  },

  hydrate: () => {
    const items = storage.getItem<CarrinhoItem[]>("cart_items", []);
    set({ items });
  },
}));
