import { formatPrice } from "@/utils/format";

interface CartSummaryProps {
  subtotal: number;
  className?: string;
}

export default function CartSummary({
  subtotal,
  className = "",
}: CartSummaryProps) {
  const shipping = subtotal > 0 ? (subtotal >= 299 ? 0 : 29.9) : 0;
  const total = subtotal + shipping;

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex justify-between font-sans text-sm text-stone-600">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between font-sans text-sm text-stone-600">
        <span>Frete</span>
        <span>
          {shipping === 0 ? (
            <span className="text-sage-600 font-medium">Grátis</span>
          ) : (
            formatPrice(shipping)
          )}
        </span>
      </div>
      {subtotal > 0 && subtotal < 299 && (
        <p className="font-sans text-xs text-sage-600">
          Frete grátis para compras acima de {formatPrice(299)}
        </p>
      )}
      <div className="border-t border-stone-200 pt-3 flex justify-between">
        <span className="font-sans text-base font-semibold text-stone-900">
          Total
        </span>
        <span className="font-serif text-lg font-bold text-stone-900">
          {formatPrice(total)}
        </span>
      </div>
    </div>
  );
}
