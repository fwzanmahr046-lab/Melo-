import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/types/database';

export interface CartLine {
  productId: string;
  name: string;
  image: string | null;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  maxStock: number;
}

interface CartState {
  lines: CartLine[];
  add: (product: Product, opts?: { size?: string; color?: string; quantity?: number }) => void;
  remove: (productId: string, size?: string, color?: string) => void;
  updateQty: (productId: string, size: string | undefined, color: string | undefined, qty: number) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      add: (product, opts = {}) => {
        const { size, color, quantity = 1 } = opts;
        const existing = get().lines.find(
          (l) => l.productId === product.id && l.size === size && l.color === color
        );
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l === existing
                ? { ...l, quantity: Math.min(l.quantity + quantity, l.maxStock) }
                : l
            ),
          });
        } else {
          set({
            lines: [
              ...get().lines,
              {
                productId: product.id,
                name: product.name,
                image: product.images[0] ?? null,
                price: product.price,
                quantity: Math.min(quantity, product.stock),
                size,
                color,
                maxStock: product.stock,
              },
            ],
          });
        }
      },
      remove: (productId, size, color) =>
        set({
          lines: get().lines.filter(
            (l) => !(l.productId === productId && l.size === size && l.color === color)
          ),
        }),
      updateQty: (productId, size, color, qty) =>
        set({
          lines: get().lines.map((l) =>
            l.productId === productId && l.size === size && l.color === color
              ? { ...l, quantity: Math.max(1, Math.min(qty, l.maxStock)) }
              : l
          ),
        }),
      clear: () => set({ lines: [] }),
    }),
    { name: 'maison-cart', version: 1 }
  )
);

export const cartTotal = (lines: CartLine[]) =>
  lines.reduce((s, l) => s + l.price * l.quantity, 0);

export const cartCount = (lines: CartLine[]) =>
  lines.reduce((s, l) => s + l.quantity, 0);
