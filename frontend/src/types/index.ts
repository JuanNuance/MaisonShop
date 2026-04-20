// ===== Product Types =====
export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  categoria: string;
  imagem_url: string | null;
  preco_promocional: number | null;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  pagina: number;
  tamanho_pagina: number;
}

// ===== User Types =====
export interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  endereco?: string;
  is_admin?: boolean;
}

export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  usuario: Usuario;
}

// ===== Cart Types =====
export interface CarrinhoItem {
  id: number;
  produto_id: number;
  quantidade: number;
  produto: Produto;
}

export interface Carrinho {
  id: number;
  usuario_id: number;
  itens: CarrinhoItem[];
  total: number;
}

export interface AddToCartPayload {
  produto_id: number;
  quantidade: number;
}

// ===== Order Types =====
export interface PedidoItem {
  id: number;
  produto_id: number;
  quantidade: number;
  preco_unitario: number;
  produto: Produto;
}

export interface Pedido {
  id: number;
  usuario_id: number;
  status: string;
  total: number;
  endereco_entrega: string;
  created_at: string;
  itens: PedidoItem[];
}

export interface CreateOrderPayload {
  endereco_entrega: string;
  forma_pagamento: string;
}

// ===== API Error =====
export interface ApiError {
  detail: string;
  status_code?: number;
}

// ===== UI Types =====
export type CheckoutStep = "info" | "shipping" | "payment" | "confirmation";
