// src/pages/RegisterPage.tsx
// CINEVISION AI — REGISTER PAGE

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Button, Input, Checkbox, Alert, Badge } from '../components/ui';
import { AuthLayout, SocialAuthButtons, AuthDivider, PasswordStrength } from '../components/auth';
import { useAuthStore } from '../store';
import { validateEmail, validatePassword } from '../lib/validations';

export function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'form' | 'success'>('form');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate name
    if (!name.trim()) {
      setError('Digite seu nome');
      return;
    }

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      setError(emailValidation.error || 'Email inválido');
      return;
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      setError(passwordValidation.error || 'Senha inválida');
      return;
    }

    // Accept terms
    if (!acceptTerms) {
      setError('Você precisa aceitar os termos de uso');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success state
      setStep('success');

      // After 2 seconds, log in and redirect
      setTimeout(() => {
        const mockUser = {
          id: '1',
          email,
          fullName: name,
          plan: 'free' as const,
          credits: 5,
          totalCreditsUsed: 0,
          role: 'user' as const,
          locale: 'pt-BR',
          onboarded: false,
          emailVerified: false,
          metadata: {},
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        login(mockUser);
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    console.log(`Register with ${provider}`);
  };

  // Success State
  if (step === 'success') {
    return (
      <AuthLayout title="" showBackToHome={false}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center"
          >
            <Check className="w-10 h-10 text-emerald-400" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-white mb-2">Conta criada com sucesso!</h2>
          <p className="text-gray-400 mb-6">
            Bem-vindo ao CineVision AI, {name.split(' ')[0]}!
          </p>

          <Badge variant="gold" className="mb-6">
            <Sparkles className="w-4 h-4 mr-1" />
            5 créditos grátis adicionados
          </Badge>

          <p className="text-sm text-gray-500">Redirecionando para o dashboard...</p>
        </motion.div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Crie sua conta"
      subtitle="Comece a transformar suas fotos gratuitamente"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Free Credits Badge */}
        <div className="flex justify-center">
          <Badge variant="gold">
            <Sparkles className="w-4 h-4 mr-1" />
            5 créditos grátis • Sem cartão
          </Badge>
        </div>

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

        <AuthDivider text="ou cadastre com email" />

        {/* Name */}
        <Input
          type="text"
          label="Nome completo"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          leftIcon={<User className="w-4 h-4" />}
          disabled={isLoading}
          autoComplete="name"
        />

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
        <div className="space-y-3">
          <Input
            type={showPassword ? 'text' : 'password'}
            label="Senha"
            placeholder="Crie uma senha forte"
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
            autoComplete="new-password"
          />
          <PasswordStrength password={password} />
        </div>

        {/* Terms */}
        <Checkbox
          checked={acceptTerms}
          onCheckedChange={(checked) => setAcceptTerms(checked === true)}
          label="Eu concordo com os Termos de Uso e Política de Privacidade"
          disabled={isLoading}
        />
        <p className="text-xs text-gray-500 -mt-2">
          Leia nossos{' '}
          <Link to="/terms" className="text-amber-400 hover:underline">
            Termos de Uso
          </Link>{' '}
          e{' '}
          <Link to="/privacy" className="text-amber-400 hover:underline">
            Política de Privacidade
          </Link>
        </p>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="gold"
          size="lg"
          className="w-full"
          isLoading={isLoading}
          rightIcon={<ArrowRight className="w-5 h-5" />}
        >
          Criar Conta Grátis
        </Button>

        {/* Login Link */}
        <p className="text-center text-gray-400">
          Já tem uma conta?{' '}
          <Link
            to="/login"
            className="text-amber-400 hover:text-amber-300 font-medium transition-colors"
          >
            Fazer login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default RegisterPage;
