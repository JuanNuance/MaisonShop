"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/common/Container";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import CartSummary from "@/components/cart/CartSummary";
import { useCartStore } from "@/store/cartStore";
import { useCreateOrder } from "@/hooks/useOrders";
import { formatPrice } from "@/utils/format";
import type { CheckoutStep } from "@/types";

const steps: { key: CheckoutStep; label: string }[] = [
  { key: "info", label: "Informações" },
  { key: "shipping", label: "Entrega" },
  { key: "payment", label: "Pagamento" },
  { key: "confirmation", label: "Confirmação" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const createOrder = useCreateOrder();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("info");
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    cidade: "",
    estado: "",
    cep: "",
    forma_pagamento: "pix",
  });

  const total = getTotal();

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    const idx = steps.findIndex((s) => s.key === currentStep);
    if (idx < steps.length - 1) {
      setCurrentStep(steps[idx + 1].key);
    }
  };

  const prevStep = () => {
    const idx = steps.findIndex((s) => s.key === currentStep);
    if (idx > 0) {
      setCurrentStep(steps[idx - 1].key);
    }
  };

  const handleSubmitOrder = async () => {
    try {
      await createOrder.mutateAsync({
        endereco_entrega: `${formData.endereco}, ${formData.cidade} - ${formData.estado}, ${formData.cep}`,
        forma_pagamento: formData.forma_pagamento,
      });
      clearCart();
      setCurrentStep("confirmation");
    } catch {
      // Error handled by mutation
    }
  };

  if (items.length === 0 && currentStep !== "confirmation") {
    router.push("/cart");
    return null;
  }

  const currentStepIndex = steps.findIndex((s) => s.key === currentStep);

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-900 mb-10">
          Checkout
        </h1>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-12 overflow-x-auto">
          {steps.map((step, i) => (
            <div key={step.key} className="flex items-center">
              <div
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-full font-sans text-sm whitespace-nowrap
                  transition-all duration-300
                  ${
                    i <= currentStepIndex
                      ? "bg-stone-900 text-white"
                      : "bg-stone-100 text-stone-400"
                  }
                `}
              >
                <span className="w-5 h-5 flex items-center justify-center text-xs font-medium">
                  {i < currentStepIndex ? "✓" : i + 1}
                </span>
                <span className="hidden sm:inline">{step.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-8 h-px mx-1 ${
                    i < currentStepIndex ? "bg-stone-900" : "bg-stone-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form Content */}
          <div className="flex-1">
            {currentStep === "info" && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <h2 className="font-serif text-xl font-semibold text-stone-900">
                  Informações Pessoais
                </h2>
                <Input
                  label="Nome completo"
                  value={formData.nome}
                  onChange={(e) => updateField("nome", e.target.value)}
                  placeholder="Seu nome completo"
                />
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      label="E-mail"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      label="Telefone"
                      value={formData.telefone}
                      onChange={(e) => updateField("telefone", e.target.value)}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button onClick={nextStep} size="lg">
                    Continuar para Entrega
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "shipping" && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <h2 className="font-serif text-xl font-semibold text-stone-900">
                  Endereço de Entrega
                </h2>
                <Input
                  label="Endereço"
                  value={formData.endereco}
                  onChange={(e) => updateField("endereco", e.target.value)}
                  placeholder="Rua, número, complemento"
                />
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      label="Cidade"
                      value={formData.cidade}
                      onChange={(e) => updateField("cidade", e.target.value)}
                      placeholder="Sua cidade"
                    />
                  </div>
                  <div className="w-full sm:w-32">
                    <Input
                      label="Estado"
                      value={formData.estado}
                      onChange={(e) => updateField("estado", e.target.value)}
                      placeholder="UF"
                    />
                  </div>
                  <div className="w-full sm:w-40">
                    <Input
                      label="CEP"
                      value={formData.cep}
                      onChange={(e) => updateField("cep", e.target.value)}
                      placeholder="00000-000"
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <Button variant="ghost" onClick={prevStep}>
                    Voltar
                  </Button>
                  <Button onClick={nextStep} size="lg">
                    Continuar para Pagamento
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "payment" && (
              <div className="flex flex-col gap-6 animate-fade-in">
                <h2 className="font-serif text-xl font-semibold text-stone-900">
                  Forma de Pagamento
                </h2>
                <div className="flex flex-col gap-3">
                  {[
                    { value: "pix", label: "Pix", desc: "Aprovação instantânea" },
                    {
                      value: "cartao",
                      label: "Cartão de Crédito",
                      desc: "Até 12x sem juros",
                    },
                    {
                      value: "boleto",
                      label: "Boleto Bancário",
                      desc: "Vencimento em 3 dias úteis",
                    },
                  ].map((method) => (
                    <label
                      key={method.value}
                      className={`
                        flex items-center gap-4 p-4 border rounded-md cursor-pointer
                        transition-all duration-300
                        ${
                          formData.forma_pagamento === method.value
                            ? "border-stone-900 bg-stone-50"
                            : "border-stone-200 hover:border-stone-300"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.value}
                        checked={formData.forma_pagamento === method.value}
                        onChange={(e) =>
                          updateField("forma_pagamento", e.target.value)
                        }
                        className="accent-stone-900"
                      />
                      <div>
                        <span className="font-sans text-sm font-medium text-stone-800 block">
                          {method.label}
                        </span>
                        <span className="font-sans text-xs text-stone-500">
                          {method.desc}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  <Button variant="ghost" onClick={prevStep}>
                    Voltar
                  </Button>
                  <Button
                    onClick={handleSubmitOrder}
                    size="lg"
                    isLoading={createOrder.isPending}
                  >
                    Confirmar Pedido — {formatPrice(total)}
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "confirmation" && (
              <div className="flex flex-col items-center text-center py-12 gap-6 animate-fade-in">
                <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-8 h-8 text-sage-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl font-semibold text-stone-900">
                  Pedido Confirmado!
                </h2>
                <p className="font-sans text-stone-500 max-w-md">
                  Obrigado pela sua compra. Você receberá um e-mail com os
                  detalhes do pedido e informações de rastreamento.
                </p>
                <div className="flex gap-4 mt-4">
                  <a href="/dashboard">
                    <Button variant="outline">Ver Meus Pedidos</Button>
                  </a>
                  <a href="/products">
                    <Button>Continuar Comprando</Button>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary (visible during form steps) */}
          {currentStep !== "confirmation" && (
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="lg:sticky lg:top-28 bg-stone-50 rounded-md p-6 flex flex-col gap-4">
                <h3 className="font-serif text-lg font-semibold text-stone-900">
                  Seu Pedido
                </h3>
                <div className="flex flex-col gap-3 border-b border-stone-200 pb-4">
                  {items.map((item) => (
                    <div
                      key={item.produto_id}
                      className="flex justify-between font-sans text-sm"
                    >
                      <span className="text-stone-600 truncate mr-2">
                        {item.produto.nome} × {item.quantidade}
                      </span>
                      <span className="text-stone-800 whitespace-nowrap">
                        {formatPrice(item.produto.preco * item.quantidade)}
                      </span>
                    </div>
                  ))}
                </div>
                <CartSummary subtotal={total} />
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
