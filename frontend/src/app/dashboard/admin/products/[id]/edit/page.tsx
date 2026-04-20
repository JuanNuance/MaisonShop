"use client";

import { useRouter, useParams } from "next/navigation";
import Container from "@/components/common/Container";
import ProductForm from "@/components/product/ProductForm";
import { useProduct, useProductMutations } from "@/hooks/useProducts";
import Link from "next/link";
import Skeleton from "@/components/ui/Skeleton";
import Card from "@/components/ui/Card";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);
  
  const { data: product, isLoading } = useProduct(id);
  const { updateProduct, isUpdating } = useProductMutations();

  const handleSubmit = async (data: any) => {
    try {
      await updateProduct({ id, product: data });
      router.push("/dashboard/admin/products");
    } catch (error) {
      alert("Erro ao atualizar produto");
    }
  };

  return (
    <section className="py-12 sm:py-16 animate-fade-in">
      <Container>
        <div className="mb-10">
          <Link href="/dashboard/admin/products" className="text-sm font-sans text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-2 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Voltar para a Lista
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900">
            Editar Produto
          </h1>
        </div>

        {isLoading ? (
          <Card className="p-6 max-w-2xl mx-auto">
            <div className="flex flex-col gap-6">
              <Skeleton className="w-1/2 h-8" />
              <div className="flex flex-col gap-4">
                <Skeleton className="w-full h-12" />
                <Skeleton className="w-full h-32" />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="w-full h-12" />
                  <Skeleton className="w-full h-12" />
                </div>
                <Skeleton className="w-full h-12" />
              </div>
            </div>
          </Card>
        ) : product ? (
          <ProductForm 
            title={`Editando: ${product.nome}`}
            initialData={product}
            onSubmit={handleSubmit} 
            isLoading={isUpdating} 
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-stone-500">Produto não encontrado.</p>
          </div>
        )}
      </Container>
    </section>
  );
}
