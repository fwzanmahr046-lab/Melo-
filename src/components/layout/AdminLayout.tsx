import { Outlet, useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export function AdminLayout() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast.success('تم تسجيل الخروج');
    navigate('/');
  };

  return (
    <div dir="rtl" className="flex min-h-screen bg-brand-50/40">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-ink-900/5 bg-white px-6">
          <div>
            <h1 className="text-sm font-medium text-ink-900">
              مرحباً، {profile?.full_name || profile?.email}
            </h1>
            <p className="text-xs text-ink-900/50">مدير النظام</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 text-brand-700">
              <User className="h-4 w-4" />
            </div>
            <button
              onClick={handleSignOut}
              className="grid h-9 w-9 place-items-center rounded-full text-ink-900/60 hover:bg-black/5 hover:text-ink-900"
              aria-label="خروج"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
