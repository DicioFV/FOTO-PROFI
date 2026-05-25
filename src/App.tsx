// src/App.tsx
// CINEVISION AI — MAIN APP WITH FULL ROUTING

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Header, Footer, Sidebar } from './components/layout';
import { ToastProvider, TooltipProvider } from './components/ui';
import { ProtectedRoute, PublicOnlyRoute } from './components/auth';
import { useAuthStore } from './store';

// All Pages
import { 
  HomePage, DashboardPage, UploadPage, EditorPage, StylesPage,
  LoginPage, RegisterPage, ForgotPasswordPage,
  StudioPage, HistoryPage, ExportsPage,
  CreditsPage, PricingPage, SettingsPage,
  ProfilePage, GalleryPage, AboutPage, NotFoundPage,
} from './pages';

// Public Layout
function PublicLayout() {
  const { isAuthenticated, user } = useAuthStore();
  return (
    <div className="min-h-screen bg-[#050507] flex flex-col">
      <Header isAuthenticated={isAuthenticated} credits={user?.credits ?? 0} userName={user?.fullName ?? 'Usuário'} />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  );
}

// Dashboard Layout
function DashboardLayout() {
  const { user } = useAuthStore();
  return (
    <div className="min-h-screen bg-[#050507]">
      <Header isAuthenticated={true} credits={user?.credits ?? 0} userName={user?.fullName ?? 'Usuário'} />
      <Sidebar credits={user?.credits ?? 0} plan={user?.plan ?? 'free'} />
      <main><Outlet /></main>
    </div>
  );
}

function App() {
  return (
    <TooltipProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="login" element={<PublicOnlyRoute><LoginPage /></PublicOnlyRoute>} />
            <Route path="register" element={<PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>} />
            <Route path="forgot-password" element={<PublicOnlyRoute><ForgotPasswordPage /></PublicOnlyRoute>} />

            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="styles" element={<StylesPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="terms" element={<AboutPage />} />
              <Route path="privacy" element={<AboutPage />} />
            </Route>
            
            {/* Protected Dashboard Routes */}
            <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="upload" element={<UploadPage />} />
              <Route path="editor" element={<EditorPage />} />
              <Route path="history" element={<HistoryPage />} />
              <Route path="exports" element={<ExportsPage />} />
              <Route path="credits" element={<CreditsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="help" element={<AboutPage />} />
              <Route path="studio" element={<StudioPage />} />
              <Route path="studio/:platform" element={<StudioPage />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </TooltipProvider>
  );
}

export default App;
