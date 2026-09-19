import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

function FullPageLoader() {
  return (
    <div className="grid min-h-screen place-items-center bg-brand-50">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-ink-900 border-t-transparent" />
    </div>
  );
}

export function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <FullPageLoader />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return <Outlet />;
}

export function AdminRoute() {
  const { user, profile, loading } = useAuth();
  const location = useLocation();
  if (loading) return <FullPageLoader />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (profile?.role !== 'admin') return <Navigate to="/" replace />;
  return <Outlet />;
}
