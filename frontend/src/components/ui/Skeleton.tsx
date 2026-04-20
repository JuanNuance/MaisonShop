interface SkeletonProps {
  className?: string;
  variant?: "text" | "card" | "image" | "circle";
}

const variantClasses = {
  text: "h-4 w-full rounded",
  card: "h-64 w-full rounded-md",
  image: "h-48 w-full rounded-md",
  circle: "h-10 w-10 rounded-full",
};

export default function Skeleton({
  className = "",
  variant = "text",
}: SkeletonProps) {
  return (
    <div
      className={`
        animate-pulse bg-stone-200
        ${variantClasses[variant]}
        ${className}
      `}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-md shadow-sm border border-stone-100">
      <Skeleton variant="image" />
      <Skeleton variant="text" className="w-3/4" />
      <Skeleton variant="text" className="w-1/2 h-3" />
      <div className="flex justify-between items-center mt-2">
        <Skeleton variant="text" className="w-1/4 h-5" />
        <Skeleton variant="circle" className="h-9 w-9" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="flex flex-wrap gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
          <ProductCardSkeleton />
        </div>
      ))}
    </div>
  );
}
