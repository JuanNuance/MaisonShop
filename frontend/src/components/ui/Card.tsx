import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = false,
}: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-md shadow-sm border border-stone-100
        ${hover ? "transition-all duration-400 ease-in-out hover:shadow-md hover:-translate-y-1" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
