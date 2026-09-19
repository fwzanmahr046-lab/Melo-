import type { Product } from '@/types/database';
import { ProductCard } from './ProductCard';

interface Props {
  products: Product[];
  loading?: boolean;
  skeletonCount?: number;
}

export function ProductGrid({ products, loading, skeletonCount = 8 }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div key={i} className="aspect-[3/4] animate-pulse rounded-2xl bg-brand-100" />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="grid place-items-center py-24 text-center">
        <p className="text-sm text-ink-900/50">لا توجد منتجات مطابقة</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
