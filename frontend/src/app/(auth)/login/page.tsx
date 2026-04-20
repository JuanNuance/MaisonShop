"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Logo from "@/components/common/Logo";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { login, isLoading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, senha });
    } catch {
      // Error handled by hook
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Logo className="mb-10" />

      <h1 className="font-serif text-2xl font-semibold text-stone-900 mb-2 text-center">
        Bem-vindo de volta
      </h1>
      <p className="font-sans text-sm text-stone-500 mb-8 text-center">
        Entre na sua conta para continuar
      </p>

      {error && (
        <div className="w-full p-3 mb-6 bg-red-50 border border-red-200 rounded-md">
          <p className="font-sans text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
        <Input
          label="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
        />
        <Input
          label="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="••••••••"
          required
        />

        <Button
          type="submit"
          className="w-full mt-2"
          size="lg"
          isLoading={isLoading}
        >
          Entrar
        </Button>
      </form>

      <p className="font-sans text-sm text-stone-500 mt-8">
        Não tem uma conta?{" "}
        <Link
          href="/register"
          className="text-sage-600 font-medium hover:underline"
        >
          Criar conta
        </Link>
      </p>
    </div>
  );
}
