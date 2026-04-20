"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Logo from "@/components/common/Logo";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
  const { register, isLoading, error } = useAuth();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (senha !== confirmarSenha) {
      setValidationError("As senhas não coincidem");
      return;
    }

    if (senha.length < 6) {
      setValidationError("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    try {
      await register({ nome, email, senha });
    } catch {
      // Error handled by hook
    }
  };

  const displayError = validationError || error;

  return (
    <div className="flex flex-col items-center">
      <Logo className="mb-10" />

      <h1 className="font-serif text-2xl font-semibold text-stone-900 mb-2 text-center">
        Criar sua conta
      </h1>
      <p className="font-sans text-sm text-stone-500 mb-8 text-center">
        Junte-se à nossa comunidade
      </p>

      {displayError && (
        <div className="w-full p-3 mb-6 bg-red-50 border border-red-200 rounded-md">
          <p className="font-sans text-sm text-red-600">{displayError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
        <Input
          label="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome"
          required
        />
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
          placeholder="Mínimo 6 caracteres"
          required
        />
        <Input
          label="Confirmar Senha"
          type="password"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          placeholder="Repita sua senha"
          required
        />

        <Button
          type="submit"
          className="w-full mt-2"
          size="lg"
          isLoading={isLoading}
        >
          Criar Conta
        </Button>
      </form>

      <p className="font-sans text-sm text-stone-500 mt-8">
        Já tem uma conta?{" "}
        <Link
          href="/login"
          className="text-sage-600 font-medium hover:underline"
        >
          Entrar
        </Link>
      </p>
    </div>
  );
}
