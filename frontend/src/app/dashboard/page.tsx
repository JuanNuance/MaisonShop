"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Container from "@/components/common/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";
import { useAuthStore } from "@/store/authStore";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import { formatPrice, formatDate, formatStatus } from "@/utils/format";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const { logout } = useAuth();
  const { data: orders, isLoading: ordersLoading } = useOrders();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  const statusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "entregue":
        return "success" as const;
      case "cancelado":
        return "danger" as const;
      case "enviado":
        return "warning" as const;
      default:
        return "default" as const;
    }
  };

  return (
    <section className="py-12 sm:py-16 animate-fade-in">
      <Container>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900">
              Minha Conta
            </h1>
            <p className="font-sans text-stone-500 mt-1">
              Olá, {user?.nome || "Cliente"}!
            </p>
          </div>
          <div className="flex gap-3">
            {user?.is_admin && (
              <Link href="/dashboard/admin">
                <Button variant="outline" className="border-sage-200 text-sage-700 hover:bg-sage-50">
                  Painel Admin
                </Button>
              </Link>
            )}
            <Button variant="outline" onClick={logout}>
              Sair
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Profile */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <Card className="p-6">
              <h2 className="font-serif text-lg font-semibold text-stone-900 mb-4">
                Dados Pessoais
              </h2>
              <div className="flex flex-col gap-3 font-sans text-sm">
                <div>
                  <span className="text-stone-400 block text-xs uppercase tracking-wider mb-0.5">
                    Nome
                  </span>
                  <span className="text-stone-800">{user?.nome || "—"}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-xs uppercase tracking-wider mb-0.5">
                    E-mail
                  </span>
                  <span className="text-stone-800">{user?.email || "—"}</span>
                </div>
                {user?.telefone && (
                  <div>
                    <span className="text-stone-400 block text-xs uppercase tracking-wider mb-0.5">
                      Telefone
                    </span>
                    <span className="text-stone-800">{user.telefone}</span>
                  </div>
                )}
                {user?.endereco && (
                  <div>
                    <span className="text-stone-400 block text-xs uppercase tracking-wider mb-0.5">
                      Endereço
                    </span>
                    <span className="text-stone-800">{user.endereco}</span>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Orders */}
          <div className="flex-1">
            <h2 className="font-serif text-lg font-semibold text-stone-900 mb-4">
              Histórico de Pedidos
            </h2>

            {ordersLoading ? (
              <div className="flex flex-col gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="p-5">
                    <div className="flex flex-col gap-3">
                      <Skeleton className="w-1/3 h-4" />
                      <Skeleton className="w-1/2 h-3" />
                      <Skeleton className="w-1/4 h-3" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : orders && orders.length > 0 ? (
              <div className="flex flex-col gap-4">
                {orders.map((pedido) => (
                  <Card key={pedido.id} className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-sans text-sm font-medium text-stone-800">
                          Pedido #{pedido.id}
                        </span>
                        <Badge variant={statusVariant(pedido.status)}>
                          {formatStatus(pedido.status)}
                        </Badge>
                      </div>
                      <span className="font-sans text-xs text-stone-400">
                        {formatDate(pedido.created_at)}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 border-t border-stone-50 pt-3">
                      {pedido.itens?.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between font-sans text-sm"
                        >
                          <span className="text-stone-600">
                            {item.produto?.nome || `Produto #${item.produto_id}`}{" "}
                            × {item.quantidade}
                          </span>
                          <span className="text-stone-800">
                            {formatPrice(item.preco_unitario * item.quantidade)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-stone-100">
                      <span className="font-sans text-xs text-stone-400">
                        {pedido.endereco_entrega}
                      </span>
                      <span className="font-serif text-base font-bold text-stone-900">
                        {formatPrice(pedido.total)}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-8">
                <div className="flex flex-col items-center text-center gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="w-12 h-12 text-stone-200"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  <p className="font-sans text-stone-500">
                    Você ainda não fez nenhum pedido.
                  </p>
                  <a href="/products">
                    <Button variant="outline" size="sm">
                      Explorar Produtos
                    </Button>
                  </a>
                </div>
              </Card>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
