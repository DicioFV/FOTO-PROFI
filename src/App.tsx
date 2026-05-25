// src/App.tsx
// CINEVISION AI — MAIN APP WITH ROUTING

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Header, Footer, Sidebar } from './components/layout';
import { ToastProvider, TooltipProvider } from './components/ui';
import { ProtectedRoute, PublicOnlyRoute } from './components/auth';
import { useAuthStore } from './store';

// Pages
import { 
  HomePage, 
  DashboardPage, 
  UploadPage, 
  EditorPage, 
  StylesPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
} from './pages';

// Public Layout (with header and footer)
function PublicLayout() {
  const { isAuthenticated, user } = useAuthStore();
  
  return (
    <div className="min-h-screen bg-[#050507] flex flex-col">
      <Header 
        isAuthenticated={isAuthenticated} 
        credits={user?.credits ?? 0}
        userName={user?.fullName ?? 'Usuário'}
      />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// Dashboard Layout (with sidebar)
function DashboardLayout() {
  const { user } = useAuthStore();
  
  return (
    <div className="min-h-screen bg-[#050507]">
      <Header 
        isAuthenticated={true} 
        credits={user?.credits ?? 0}
        userName={user?.fullName ?? 'Usuário'}
      />
      <Sidebar 
        credits={user?.credits ?? 0}
        plan={user?.plan ?? 'free'}
      />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

// Placeholder pages
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-[#050507] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">{title}</h1>
        <p className="text-gray-400">Em desenvolvimento</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <TooltipProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth Routes (Public Only) */}
            <Route path="login" element={
              <PublicOnlyRoute>
                <LoginPage />
              </PublicOnlyRoute>
            } />
            <Route path="register" element={
              <PublicOnlyRoute>
                <RegisterPage />
              </PublicOnlyRoute>
            } />
            <Route path="forgot-password" element={
              <PublicOnlyRoute>
                <ForgotPasswordPage />
              </PublicOnlyRoute>
            } />

            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route index element={<HomePage />} />
              <Route path="styles" element={<StylesPage />} />
              <Route path="pricing" element={<PlaceholderPage title="Planos" />} />
              <Route path="gallery" element={<PlaceholderPage title="Galeria" />} />
              <Route path="about" element={<PlaceholderPage title="Sobre" />} />
              <Route path="terms" element={<PlaceholderPage title="Termos de Uso" />} />
              <Route path="privacy" element={<PlaceholderPage title="Política de Privacidade" />} />
            </Route>
            
            {/* Protected Dashboard Routes */}
            <Route element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="upload" element={<UploadPage />} />
              <Route path="editor" element={<EditorPage />} />
              <Route path="history" element={<PlaceholderPage title="Histórico" />} />
              <Route path="exports" element={<PlaceholderPage title="Exportações" />} />
              <Route path="credits" element={<PlaceholderPage title="Créditos" />} />
              <Route path="settings" element={<PlaceholderPage title="Configurações" />} />
              <Route path="profile" element={<PlaceholderPage title="Perfil" />} />
              <Route path="help" element={<PlaceholderPage title="Ajuda" />} />
              {/* Studios */}
              <Route path="studio/instagram" element={<PlaceholderPage title="Instagram Studio" />} />
              <Route path="studio/youtube" element={<PlaceholderPage title="YouTube Studio" />} />
              <Route path="studio/thumbnails" element={<PlaceholderPage title="Thumbnails Studio" />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={
              <div className="min-h-screen bg-[#050507] flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-white mb-4">404</h1>
                  <p className="text-gray-400 mb-8">Página não encontrada</p>
                  <a href="/" className="text-amber-400 hover:underline">Voltar ao início</a>
                </div>
              </div>
            } />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </TooltipProvider>
  );
}

export default App;
