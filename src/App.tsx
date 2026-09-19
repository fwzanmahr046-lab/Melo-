import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute, AdminRoute } from '@/routes/ProtectedRoute';

import { StoreLayout } from '@/components/layout/StoreLayout';
import { AdminLayout } from '@/components/layout/AdminLayout';

import { HomePage } from '@/pages/store/Home';
import { ShopPage } from '@/pages/store/Shop';
import { ProductPage } from '@/pages/store/ProductDetail';
import { CartPage } from '@/pages/store/Cart';
import { CheckoutPage } from '@/pages/store/Checkout';
import { LoginPage } from '@/pages/store/Login';
import { RegisterPage } from '@/pages/store/Register';
import { AboutPage } from '@/pages/store/About';
import { NotFoundPage } from '@/pages/store/NotFound';
import { AccountPage } from '@/pages/store/Account';

import { AdminDashboard } from '@/pages/admin/Dashboard';
import { ProductsAdmin } from '@/pages/admin/ProductsAdmin';
import { OrdersAdmin } from '@/pages/admin/OrdersAdmin';
import { CustomersAdmin } from '@/pages/admin/CustomersAdmin';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter basename="/fashion-store">
          <Routes>
            <Route element={<StoreLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:slug" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/account" element={<AccountPage />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            <Route element={<AdminRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/products" element={<ProductsAdmin />} />
                <Route path="/admin/orders" element={<OrdersAdmin />} />
                <Route path="/admin/customers" element={<CustomersAdmin />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" richColors closeButton />
      </AuthProvider>
    </QueryClientProvider>
  );
}
