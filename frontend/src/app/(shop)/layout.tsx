import type { ReactNode } from "react";

export default function ShopLayout({ children }: { children: ReactNode }) {
  return <div className="animate-fade-in">{children}</div>;
}
