// src/pages/LoginPage.tsx
// CINEVISION AI — LOGIN PAGE

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button, Input, Checkbox, Alert } from '../components/ui';
import { AuthLayout, SocialAuthButtons, AuthDivider } from '../components/auth';
import { useAuthStore } from '../store';
import { validateEmail } from '../lib/validations';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      setError(emailValidation.error || 'Email inválido');
      return;
    }

    // Validate password
    if (!password) {
      setError('Digite sua senha');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock login - in real app, this would be an API call
      const mockUser = {
        id: '1',
        email,
        fullName: 'Usuário Demo',
        plan: 'pro' as const,
        credits: 150,
        totalCreditsUsed: 50,
        role: 'user' as const,
        locale: 'pt-BR',
        onboarded: true,
        emailVerified: true,
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      login(mockUser);
      navigate('/dashboard');
    } catch (err) {
      setError('Email ou senha incorretos. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    console.log(`Login with ${provider}`);
    // In real app, this would redirect to OAuth provider
  };

  return (
    <AuthLayout
      title="Bem-vindo de volta"
      subtitle="Entre na sua conta para continuar criando"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert variant="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          </motion.div>
        )}

        {/* Social Login */}
        <SocialAuthButtons
          onGoogleClick={() => handleSocialLogin('google')}
          onGitHubClick={() => handleSocialLogin('github')}
          isLoading={isLoading}
        />

        <AuthDivider text="ou continue com email" />

        {/* Email */}
        <Input
          type="email"
          label="Email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail className="w-4 h-4" />}
          disabled={isLoading}
          autoComplete="email"
        />

        {/* Password */}
        <Input
          type={showPassword ? 'text' : 'password'}
          label="Senha"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock className="w-4 h-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
          disabled={isLoading}
          autoComplete="current-password"
        />

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <Checkbox
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked === true)}
            label="Lembrar de mim"
            disabled={isLoading}
          />
          <Link
            to="/forgot-password"
            className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
          >
            Esqueceu a senha?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="gold"
          size="lg"
          className="w-full"
          isLoading={isLoading}
          rightIcon={<ArrowRight className="w-5 h-5" />}
        >
          Entrar
        </Button>

        {/* Sign Up Link */}
        <p className="text-center text-gray-400">
          Não tem uma conta?{' '}
          <Link
            to="/register"
            className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
          >
            Crie grátis
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
