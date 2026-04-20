import Link from "next/link";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <Link href="/" className={`inline-block ${className}`}>
      <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
        Maison
      </span>
      <span className="font-serif text-2xl sm:text-3xl font-light text-sage-600 tracking-tight">
        .
      </span>
    </Link>
  );
}
