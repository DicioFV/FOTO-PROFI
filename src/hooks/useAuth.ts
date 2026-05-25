// src/hooks/useAuth.ts
// CINEVISION AI — AUTH HOOK

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import type { User } from '../types';

export function useAuth() {
  const navigate = useNavigate();
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    login: storeLogin, 
    logout: storeLogout,
    updateUser: storeUpdateUser,
  } = useAuthStore();

  // Login
  const login = useCallback(async (email: string, _password: string) => {
    try {
      // In real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user
      const mockUser: User = {
        id: '1',
        email,
        fullName: 'Usuário Demo',
        plan: 'pro',
        credits: 150,
        totalCreditsUsed: 50,
        role: 'user',
        locale: 'pt-BR',
        onboarded: true,
        emailVerified: true,
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      storeLogin(mockUser);
      navigate('/dashboard');
      return { success: true };
    } catch {
      return { success: false, error: 'Invalid credentials' };
    }
  }, [storeLogin, navigate]);

  // Register
  const register = useCallback(async (name: string, email: string, _password: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockUser: User = {
        id: '1',
        email,
        fullName: name,
        plan: 'free',
        credits: 5,
        totalCreditsUsed: 0,
        role: 'user',
        locale: 'pt-BR',
        onboarded: false,
        emailVerified: false,
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      storeLogin(mockUser);
      navigate('/dashboard');
      return { success: true };
    } catch {
      return { success: false, error: 'Registration failed' };
    }
  }, [storeLogin, navigate]);

  // Logout
  const logout = useCallback(() => {
    storeLogout();
    navigate('/');
  }, [storeLogout, navigate]);

  // Social login
  const socialLogin = useCallback(async (provider: 'google' | 'github' | 'apple') => {
    try {
      // In real app, this would redirect to OAuth provider
      console.log(`Social login with ${provider}`);
      return { success: true };
    } catch {
      return { success: false, error: 'Social login failed' };
    }
  }, []);

  // Forgot password
  const forgotPassword = useCallback(async (_email: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true };
    } catch {
      return { success: false, error: 'Failed to send email' };
    }
  }, []);

  // Reset password
  const resetPassword = useCallback(async (_token: string, _password: string) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate('/login');
      return { success: true };
    } catch {
      return { success: false, error: 'Failed to reset password' };
    }
  }, [navigate]);

  // Update profile
  const updateProfile = useCallback(async (updates: Partial<User>) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      storeUpdateUser(updates);
      return { success: true };
    } catch {
      return { success: false, error: 'Failed to update profile' };
    }
  }, [storeUpdateUser]);

  // Check if user has specific plan
  const hasPlan = useCallback((plans: string[]) => {
    return user ? plans.includes(user.plan) : false;
  }, [user]);

  // Check if user has enough credits
  const hasCredits = useCallback((amount: number) => {
    return user ? user.credits >= amount : false;
  }, [user]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    socialLogin,
    forgotPassword,
    resetPassword,
    updateProfile,
    hasPlan,
    hasCredits,
  };
}

export default useAuth;
