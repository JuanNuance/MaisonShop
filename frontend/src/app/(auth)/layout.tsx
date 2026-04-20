import type { ReactNode } from "react";
import Container from "@/components/common/Container";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 sm:py-20">
      <Container className="max-w-md">
        <div className="animate-fade-in">{children}</div>
      </Container>
    </div>
  );
}
