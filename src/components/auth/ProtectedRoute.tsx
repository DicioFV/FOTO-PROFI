// src/components/auth/ProtectedRoute.tsx
// CINEVISION AI — PROTECTED ROUTE WRAPPER

import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store';
import { LoadingScreen } from '../shared/LoadingScreen';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requirePlan?: string[];
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  requireAuth = true,
  requirePlan,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuthStore();
  const location = useLocation();

  // Show loading while checking auth state
  if (isLoading) {
    return <LoadingScreen message="Verificando autenticação..." />;
  }

  // Redirect to login if not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check plan requirements
  if (requirePlan && user && !requirePlan.includes(user.plan)) {
    return <Navigate to="/pricing" state={{ upgrade: true }} replace />;
  }

  return <>{children}</>;
}

// Redirect authenticated users away from auth pages
export function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    const from = (location.state as { from?: Location })?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
