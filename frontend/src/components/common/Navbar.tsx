"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Container from "./Container";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/products", label: "Produtos" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();
  const itemCount = useCartStore((s) => s.getItemCount());
  const toggleCart = useCartStore((s) => s.toggleCart);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
      <Container>
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Hamburger */}
          <button
            onClick={toggleMobileMenu}
            className="sm:hidden flex flex-col gap-1.5 p-2 -ml-2"
            aria-label="Menu"
          >
            <span
              className={`block w-5 h-0.5 bg-stone-800 transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-stone-800 transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-stone-800 transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden sm:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  font-sans text-sm tracking-wide uppercase
                  transition-all duration-300 ease-in-out
                  ${
                    pathname === link.href
                      ? "text-stone-900 font-medium"
                      : "text-stone-500 hover:text-stone-800"
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Logo Center */}
          <Logo />

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* User Icon */}
            <Link
              href={isAuthenticated ? "/dashboard" : "/login"}
              className="text-stone-600 hover:text-stone-900 transition-colors duration-300"
              aria-label="Conta"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </Link>

            {/* Cart Icon */}
            <button
              onClick={toggleCart}
              className="relative text-stone-600 hover:text-stone-900 transition-colors duration-300"
              aria-label="Carrinho"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-sage-600 text-white text-[10px] font-medium rounded-full h-4 w-4 flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      <div
        className={`
          sm:hidden overflow-hidden transition-all duration-400 ease-in-out
          ${isMobileMenuOpen ? "max-h-60 border-t border-stone-100" : "max-h-0"}
        `}
      >
        <Container>
          <div className="flex flex-col py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={`
                  py-3 px-2 font-sans text-sm tracking-wide uppercase rounded
                  transition-all duration-300
                  ${
                    pathname === link.href
                      ? "text-stone-900 font-medium bg-stone-50"
                      : "text-stone-500 hover:text-stone-800 hover:bg-stone-50"
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={isAuthenticated ? "/dashboard" : "/login"}
              onClick={closeMobileMenu}
              className="py-3 px-2 font-sans text-sm tracking-wide uppercase text-stone-500 hover:text-stone-800 hover:bg-stone-50 rounded transition-all duration-300"
            >
              {isAuthenticated ? "Minha Conta" : "Entrar"}
            </Link>
          </div>
        </Container>
      </div>
    </nav>
  );
}
