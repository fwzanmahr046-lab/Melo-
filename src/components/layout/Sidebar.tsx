import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Users, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const items = [
  { to: '/admin/dashboard', label: 'نظرة عامة', icon: LayoutDashboard },
  { to: '/admin/products', label: 'المنتجات', icon: Package },
  { to: '/admin/orders', label: 'الطلبات', icon: ShoppingBag },
  { to: '/admin/customers', label: 'العملاء', icon: Users },
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-l border-ink-900/5 bg-white md:flex">
      <div className="flex h-16 items-center border-b border-ink-900/5 px-6">
        <Link to="/" className="font-display text-lg font-semibold">
          MAISON<span className="text-brand-500">.</span>
          <span className="mr-2 text-xs font-normal text-ink-900/40">لوحة التحكم</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-ink-900 text-white'
                  : 'text-ink-900/70 hover:bg-black/5 hover:text-ink-900'
              )
            }
          >
            <it.icon className="h-4 w-4" />
            {it.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 rounded-xl border border-ink-900/10 px-3 py-2.5 text-sm font-medium text-ink-900/70 hover:bg-black/5"
        >
          <ArrowRight className="h-4 w-4" />
          العودة للمتجر
        </Link>
      </div>
    </aside>
  );
}
