"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/common/Container";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";

export default function AdminDashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (!user?.is_admin) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user?.is_admin) return null;

  return (
    <section className="py-12 sm:py-16 animate-fade-in">
      <Container>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900">
              Painel do Administrador
            </h1>
            <p className="font-sans text-stone-500 mt-1">
              Bem-vindo, {user?.nome}!
            </p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">Ver Área do Cliente</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 flex flex-col gap-4">
            <div className="w-12 h-12 bg-sage-50 text-sage-600 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
            </div>
            <div>
              <h2 className="font-serif text-xl font-semibold text-stone-900">Produtos</h2>
              <p className="font-sans text-sm text-stone-500 mt-1">
                Adicione, edite ou remova produtos do catálogo.
              </p>
            </div>
            <Link href="/dashboard/admin/products" className="mt-auto">
              <Button className="w-full">Gerenciar Produtos</Button>
            </Link>
          </Card>

          <Card className="p-6 flex flex-col gap-4">
            <div className="w-12 h-12 bg-sage-50 text-sage-600 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
            <div>
              <h2 className="font-serif text-xl font-semibold text-stone-900">Pedidos</h2>
              <p className="font-sans text-sm text-stone-500 mt-1">
                Visualize e atualize o status dos pedidos dos clientes.
              </p>
            </div>
            <Button variant="outline" className="w-full mt-auto" disabled>
              Em breve
            </Button>
          </Card>

          <Card className="p-6 flex flex-col gap-4">
            <div className="w-12 h-12 bg-sage-50 text-sage-600 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
            </div>
            <div>
              <h2 className="font-serif text-xl font-semibold text-stone-900">Usuários</h2>
              <p className="font-sans text-sm text-stone-500 mt-1">
                Gerencie as contas dos usuários cadastrados.
              </p>
            </div>
            <Button variant="outline" className="w-full mt-auto" disabled>
              Em breve
            </Button>
          </Card>
        </div>
      </Container>
    </section>
  );
}
