import { Link } from 'react-router-dom';
import type { Product } from '@/types/database';
import { formatPrice } from '@/lib/utils';

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600';
  const hasDiscount = product.compare_price && product.compare_price > product.price;

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white transition-all hover:shadow-soft"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-100">
        <img
          src={image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {hasDiscount && (
          <span className="absolute right-3 top-3 rounded-full bg-ink-900 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
            خصم
          </span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 grid place-items-center bg-white/70 backdrop-blur-sm">
            <span className="rounded-full bg-ink-900 px-4 py-1.5 text-xs font-medium text-white">
              نفذت الكمية
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="line-clamp-1 text-sm font-medium text-ink-900">{product.name}</h3>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base font-semibold text-ink-900">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className="text-xs text-ink-900/40 line-through">
              {formatPrice(product.compare_price!)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
