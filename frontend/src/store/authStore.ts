"use client";

import { create } from "zustand";
import type { Usuario } from "@/types";
import { storage } from "@/utils/storage";

interface AuthState {
  user: Usuario | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: Usuario, token: string) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setAuth: (user, token) => {
    storage.setItem("auth_token", token);
    storage.setItem("auth_user", user);
    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    storage.removeItem("auth_token");
    storage.removeItem("auth_user");
    set({ user: null, token: null, isAuthenticated: false });
  },

  hydrate: () => {
    const token = storage.getItem<string | null>("auth_token", null);
    const user = storage.getItem<Usuario | null>("auth_user", null);
    if (token && user) {
      set({ user, token, isAuthenticated: true });
    }
  },
}));
