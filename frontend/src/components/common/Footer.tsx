"use client";

import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";

const footerLinks = {
  shop: [
    { href: "/products", label: "Todos os Produtos" },
    { href: "/products?categoria=novidades", label: "Novidades" },
    { href: "/products?categoria=mais-vendidos", label: "Mais Vendidos" },
  ],
  company: [
    { href: "/about", label: "Sobre Nós" },
    { href: "/contact", label: "Contato" },
    { href: "/sustainability", label: "Sustentabilidade" },
  ],
  support: [
    { href: "/faq", label: "Perguntas Frequentes" },
    { href: "/shipping", label: "Entregas" },
    { href: "/returns", label: "Trocas e Devoluções" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-auto">
      <Container>
        <div className="flex flex-col sm:flex-row flex-wrap gap-12 py-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-4 sm:flex-1 sm:min-w-[200px]">
            <div className="[&_span]:text-stone-50">
              <Logo />
            </div>
            <p className="font-sans text-sm text-stone-400 leading-relaxed max-w-xs">
              Produtos cuidadosamente selecionados para quem valoriza
              qualidade, design e sustentabilidade.
            </p>
          </div>

          {/* Shop Links */}
          <div className="flex flex-col gap-3 sm:flex-1 sm:min-w-[150px]">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-stone-50 mb-1">
              Loja
            </h4>
            {footerLinks.shop.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-stone-400 hover:text-stone-50 transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-3 sm:flex-1 sm:min-w-[150px]">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-stone-50 mb-1">
              Empresa
            </h4>
            {footerLinks.company.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-stone-400 hover:text-stone-50 transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Support Links */}
          <div className="flex flex-col gap-3 sm:flex-1 sm:min-w-[150px]">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-stone-50 mb-1">
              Suporte
            </h4>
            {footerLinks.support.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-stone-400 hover:text-stone-50 transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-3 sm:flex-1 sm:min-w-[240px]">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-widest text-stone-50 mb-1">
              Newsletter
            </h4>
            <p className="font-sans text-sm text-stone-400">
              Receba novidades e ofertas exclusivas.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-md text-sm font-sans text-stone-200 placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-sage-500 focus:border-transparent transition-all duration-300"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-sage-600 text-white text-sm font-sans font-medium rounded-md hover:bg-sage-700 transition-colors duration-300"
              >
                Assinar
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-stone-500">
            © {new Date().getFullYear()} Maison. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="font-sans text-xs text-stone-500 hover:text-stone-300 transition-colors duration-300"
            >
              Privacidade
            </Link>
            <Link
              href="/terms"
              className="font-sans text-xs text-stone-500 hover:text-stone-300 transition-colors duration-300"
            >
              Termos
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
