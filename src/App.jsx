import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Layouts
import { CustomerLayout } from './layouts/CustomerLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { SmartCartLayout } from './layouts/SmartCartLayout';

// Auth Store (for protected routes)
import { useAuthStore } from './store/authStore';

// ---- CUSTOMER / PUBLIC PAGES ----
import { HomePage } from './pages/user/HomePage';
import { ProductsPage } from './pages/user/ProductsPage';
import { ProductDetailPage } from './pages/user/ProductDetailPage';
import { CategoriesPage } from './pages/user/CategoriesPage';
import { SearchPage } from './pages/user/SearchPage';
import { ComparePage } from './pages/user/ComparePage';
import { OffersPage } from './pages/user/OffersPage';
import { WishlistPage } from './pages/user/WishlistPage';
import { CheckoutPage } from './pages/user/CheckoutPage';
import { OrderSuccessPage } from './pages/user/OrderSuccessPage';
import { OrdersPage } from './pages/user/OrdersPage';
import { OrderDetailPage } from './pages/user/OrderDetailPage';
import { ProfilePage } from './pages/user/ProfilePage';
import { RecommendationsPage } from './pages/user/RecommendationsPage';
import { LoginPage } from './pages/user/LoginPage';
import { RegisterPage } from './pages/user/RegisterPage';
import { ForgotPasswordPage } from './pages/user/ForgotPasswordPage';
import { SmartCartPage } from './pages/user/SmartCartPage';

// ---- ADMIN PAGES ----
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminProductFormPage } from './pages/admin/AdminProductFormPage';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage';
import { AdminBrandsPage } from './pages/admin/AdminBrandsPage';
import { AdminInventoryPage } from './pages/admin/AdminInventoryPage';
import { AdminStoresPage } from './pages/admin/AdminStoresPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { AdminOffersPage } from './pages/admin/AdminOffersPage';
import { AdminReviewsPage } from './pages/admin/AdminReviewsPage';
import { AdminComparisonsPage } from './pages/admin/AdminComparisonsPage';
import { AdminRecommendationsPage } from './pages/admin/AdminRecommendationsPage';
import { AdminSmartCartsPage } from './pages/admin/AdminSmartCartsPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';

// ─── QueryClient ──────────────────────────────────────────────────────────────
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, retry: 1 },
  },
});

// ─── Route Guards ─────────────────────────────────────────────────────────────
function AdminRoute({ children }) {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== 'admin') return <Navigate to="/" replace />;
  return children;
}

function AuthRoute({ children }) {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return children;
}

// ─── Page Loader ──────────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBFC]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-[#FF3F6C] text-white flex items-center justify-center font-black text-2xl animate-pulse shadow-lg">
          S
        </div>
        <div className="text-xs text-[#696E79] font-semibold tracking-wide">Loading SmartMart…</div>
      </div>
    </div>
  );
}

// ─── 404 Page ─────────────────────────────────────────────────────────────────
function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBFC]">
      <div className="text-center space-y-5 px-4">
        <div className="text-9xl font-black text-[#FF3F6C] leading-none">404</div>
        <h1 className="text-2xl font-black text-[#282C3F]">Page Not Found</h1>
        <p className="text-sm text-[#696E79] max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-[#FF3F6C] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#D81B4E] transition-colors text-sm shadow-md"
        >
          ← Back to SmartMart Home
        </a>
      </div>
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>

            {/* ── Customer / Public (with header + footer) ── */}
            <Route element={<CustomerLayout />}>
              <Route index element={<HomePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/:id" element={<ProductDetailPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="categories/:slug" element={<ProductsPage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="compare" element={<ComparePage />} />
              <Route path="offers" element={<OffersPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="order-success" element={<OrderSuccessPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="orders/:id" element={<OrderDetailPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="recommendations" element={<RecommendationsPage />} />
            </Route>

            {/* ── Smart Cart Kiosk (full-screen, no nav) ── */}
            <Route path="smart-cart" element={<SmartCartLayout />}>
              <Route index element={<SmartCartPage />} />
            </Route>

            {/* ── Auth pages (redirect if already logged in) ── */}
            <Route path="login" element={<AuthRoute><LoginPage /></AuthRoute>} />
            <Route path="register" element={<AuthRoute><RegisterPage /></AuthRoute>} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />

            {/* ── Admin portal (admin-only with sidebar) ── */}
            <Route path="admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
              <Route index element={<AdminDashboardPage />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="products/new" element={<AdminProductFormPage />} />
              <Route path="products/:id" element={<AdminProductFormPage />} />
              <Route path="categories" element={<AdminCategoriesPage />} />
              <Route path="brands" element={<AdminBrandsPage />} />
              <Route path="inventory" element={<AdminInventoryPage />} />
              <Route path="stores" element={<AdminStoresPage />} />
              <Route path="orders" element={<AdminOrdersPage />} />
              <Route path="customers" element={<AdminCustomersPage />} />
              <Route path="offers" element={<AdminOffersPage />} />
              <Route path="reviews" element={<AdminReviewsPage />} />
              <Route path="comparisons" element={<AdminComparisonsPage />} />
              <Route path="recommendations" element={<AdminRecommendationsPage />} />
              <Route path="smart-carts" element={<AdminSmartCartsPage />} />
              <Route path="analytics" element={<AdminAnalyticsPage />} />
            </Route>

            {/* ── 404 catch-all ── */}
            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
