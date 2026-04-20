import axios from "axios";
import type {
  Produto,
  PaginatedResponse,
  AuthResponse,
  LoginCredentials,
  RegisterData,
  Usuario,
  Carrinho,
  AddToCartPayload,
  Pedido,
  CreateOrderPayload,
} from "@/types";
import { storage } from "@/utils/storage";

// ===== Axios Instance =====
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// JWT Interceptor – automatically attach token to requests
api.interceptors.request.use((config) => {
  const token = storage.getItem<string | null>("auth_token", null);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for 401 handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storage.removeItem("auth_token");
      storage.removeItem("auth_user");
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// ===== Product Services =====
export const productService = {
  async getAll(
    pagina: number = 1,
    tamanho_pagina: number = 12,
    categoria?: string
  ): Promise<PaginatedResponse<Produto>> {
    const params: Record<string, string | number> = { pagina, tamanho_pagina };
    if (categoria) params.categoria = categoria;
    const { data } = await api.get("/produtos", { params });
    return data;
  },

  async getById(id: number): Promise<Produto> {
    const { data } = await api.get(`/produtos/${id}`);
    return data;
  },

  async create(produto: Omit<Produto, "id">): Promise<Produto> {
    const { data } = await api.post("/produtos", produto);
    return data;
  },

  async update(id: number, produto: Partial<Produto>): Promise<Produto> {
    const { data } = await api.patch(`/produtos/${id}`, produto);
    return data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/produtos/${id}`);
  },
};

// ===== Auth Services =====
export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post("/auth/login", credentials);
    return data;
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const { data } = await api.post("/auth/registro", userData);
    return data;
  },

  async getProfile(): Promise<Usuario> {
    const { data } = await api.get("/usuarios/me");
    return data;
  },

  async updateProfile(userData: Partial<Usuario>): Promise<Usuario> {
    const { data } = await api.put("/usuarios/me", userData);
    return data;
  },
};

// ===== Cart Services =====
export const cartService = {
  async get(): Promise<Carrinho> {
    const { data } = await api.get("/carrinho");
    return data;
  },

  async addItem(payload: AddToCartPayload): Promise<Carrinho> {
    const { data } = await api.post("/carrinho/itens", payload);
    return data;
  },

  async updateItem(itemId: number, quantidade: number): Promise<Carrinho> {
    const { data } = await api.put(`/carrinho/itens/${itemId}`, { quantidade });
    return data;
  },

  async removeItem(itemId: number): Promise<Carrinho> {
    const { data } = await api.delete(`/carrinho/itens/${itemId}`);
    return data;
  },

  async clear(): Promise<void> {
    await api.delete("/carrinho");
  },
};

// ===== Order Services =====
export const orderService = {
  async getAll(): Promise<Pedido[]> {
    const { data } = await api.get("/pedidos");
    return data;
  },

  async getById(id: number): Promise<Pedido> {
    const { data } = await api.get(`/pedidos/${id}`);
    return data;
  },

  async create(payload: CreateOrderPayload): Promise<Pedido> {
    const { data } = await api.post("/pedidos", payload);
    return data;
  },
};

export default api;
