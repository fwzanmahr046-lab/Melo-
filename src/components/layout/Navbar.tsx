import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart, cartCount } from '@/hooks/useCart';
import { cn } from '@/lib/utils';

const links = [
  { to: '/', label: 'الرئيسية', end: true },
  { to: '/shop', label: 'المتجر' },
  { to: '/about', label: 'من نحن' },
];

export function Navbar() {
  const { user, profile, isAdmin, signOut } = useAuth();
  const lines = useCart((s) => s.lines);
  const count = cartCount(lines);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink-900/5 bg-white/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="font-display text-xl font-semibold tracking-tight">
          MAISON<span className="text-brand-500">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium transition-colors',
                  isActive ? 'text-ink-900' : 'text-ink-900/60 hover:text-ink-900'
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink
              to="/admin/dashboard"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              <LayoutDashboard className="h-3.5 w-3.5" /> لوحة التحكم
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-black/5"
            aria-label="السلة"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-ink-900 px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                to="/account"
                className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/5"
                aria-label="حسابي"
              >
                <User className="h-5 w-5" />
              </Link>
              <button
                onClick={handleSignOut}
                className="grid h-10 w-10 place-items-center rounded-full text-ink-900/60 hover:bg-black/5 hover:text-ink-900"
                aria-label="تسجيل الخروج"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden h-10 items-center rounded-full bg-ink-900 px-5 text-sm font-medium text-white hover:bg-ink-800 md:inline-flex"
            >
              دخول
            </Link>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/5 md:hidden"
            aria-label="القائمة"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-ink-900/5 bg-white md:hidden">
          <div className="container mx-auto flex flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-2 text-sm font-medium',
                    isActive ? 'bg-brand-50 text-ink-900' : 'text-ink-900/70'
                  )
                }
              >
                {l.label}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink
                to="/admin/dashboard"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-brand-600"
              >
                لوحة التحكم
              </NavLink>
            )}
            {user ? (
              <>
                <NavLink
                  to="/account"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-ink-900/70"
                >
                  حسابي
                </NavLink>
                <button
                  onClick={handleSignOut}
                  className="rounded-lg px-3 py-2 text-right text-sm font-medium text-red-600"
                >
                  تسجيل الخروج
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-ink-900 px-3 py-2 text-center text-sm font-medium text-white"
              >
                دخول
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
