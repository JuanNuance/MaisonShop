"use client";

import Link from "next/link";
import Container from "@/components/common/Container";
import ProductGrid from "@/components/product/ProductGrid";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";
import Button from "@/components/ui/Button";
import { useProducts } from "@/hooks/useProducts";

export default function HomePage() {
  const { data, isLoading } = useProducts(1, 8);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-stone-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/60 to-stone-900/20" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-900/70 to-transparent" />

        <Container className="relative z-10">
          <div className="flex flex-col justify-center min-h-[70vh] sm:min-h-[80vh] max-w-2xl py-20">
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-stone-300 mb-4">
              Curadoria Premium
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Menos é mais.
              <br />
              <span className="text-stone-300 font-light">
                Quando é o melhor.
              </span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-stone-300 leading-relaxed mb-8 max-w-lg">
              Descubra uma seleção refinada de produtos que combinam design
              atemporal, materiais nobres e produção responsável.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg" className="px-10">
                  Explorar Coleção
                </Button>
              </Link>
              <Link href="#about">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                  Nossa História
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-col items-center text-center mb-14">
            <span className="font-sans text-xs tracking-[0.3em] uppercase text-sage-600 mb-3">
              Selecionados para você
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 mb-4">
              Destaques
            </h2>
            <p className="font-sans text-stone-500 max-w-md">
              Peças escolhidas a dedo pela nossa equipe de curadoria,
              representando o melhor em design e qualidade.
            </p>
          </div>

          {isLoading ? (
            <ProductGridSkeleton count={8} />
          ) : (
            <ProductGrid produtos={data?.items || []} />
          )}

          <div className="flex justify-center mt-14">
            <Link href="/products">
              <Button variant="outline" size="lg">
                Ver Todos os Produtos
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 sm:py-28 bg-stone-100/50">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 max-w-xl">
              <span className="font-sans text-xs tracking-[0.3em] uppercase text-sage-600 mb-3 block">
                Sobre a Maison
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 mb-6">
                Qualidade que transcende o tempo
              </h2>
              <div className="flex flex-col gap-4 font-sans text-stone-600 leading-relaxed">
                <p>
                  A Maison nasceu da crença de que os objetos que nos cercam
                  devem contar histórias. Cada produto em nossa curadoria é
                  selecionado não apenas pela sua beleza, mas pela integridade
                  de sua produção.
                </p>
                <p>
                  Trabalhamos diretamente com artesãos e pequenos produtores
                  que compartilham nossa paixão por materiais sustentáveis e
                  processos responsáveis, garantindo que cada peça carregue
                  significado além da estética.
                </p>
              </div>
              <div className="flex flex-wrap gap-12 mt-10">
                <div className="flex flex-col">
                  <span className="font-serif text-3xl font-bold text-stone-900">
                    200+
                  </span>
                  <span className="font-sans text-sm text-stone-500 mt-1">
                    Produtos curados
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-3xl font-bold text-stone-900">
                    50+
                  </span>
                  <span className="font-sans text-sm text-stone-500 mt-1">
                    Artesãos parceiros
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-3xl font-bold text-stone-900">
                    100%
                  </span>
                  <span className="font-sans text-sm text-stone-500 mt-1">
                    Sustentável
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-lg">
              <div className="relative aspect-[4/5] rounded-md overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80')`,
                  }}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Banner */}
      <section className="py-20 sm:py-24 bg-stone-900">
        <Container>
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-white mb-4">
              Pronto para transformar seu espaço?
            </h2>
            <p className="font-sans text-stone-400 mb-8 max-w-md">
              Junte-se a milhares de pessoas que escolheram viver com
              menos, mas melhor.
            </p>
            <Link href="/products">
              <Button
                size="lg"
                className="bg-sage-600 hover:bg-sage-700 px-10"
              >
                Começar Agora
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
