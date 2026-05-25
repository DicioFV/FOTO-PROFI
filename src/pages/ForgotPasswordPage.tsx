// src/pages/ForgotPasswordPage.tsx
// CINEVISION AI — FORGOT PASSWORD PAGE

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button, Input, Alert } from '../components/ui';
import { AuthLayout } from '../components/auth';
import { validateEmail } from '../lib/validations';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      setError(emailValidation.error || 'Email inválido');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (err) {
      setError('Erro ao enviar email. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Success State
  if (isSubmitted) {
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
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-white mb-2">Email enviado!</h2>
          <p className="text-gray-400 mb-6">
            Enviamos um link de recuperação para<br />
            <span className="text-white font-medium">{email}</span>
          </p>

          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Não recebeu? Verifique sua caixa de spam ou
            </p>
            <Button
              variant="outline"
              onClick={() => setIsSubmitted(false)}
            >
              Tentar outro email
            </Button>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10">
            <Link to="/login">
              <Button variant="ghost" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Voltar para o login
              </Button>
            </Link>
          </div>
        </motion.div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Esqueceu a senha?"
      subtitle="Digite seu email e enviaremos um link para redefinir sua senha"
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
          hint="Digite o email associado à sua conta"
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="gold"
          size="lg"
          className="w-full"
          isLoading={isLoading}
          rightIcon={<ArrowRight className="w-5 h-5" />}
        >
          Enviar Link de Recuperação
        </Button>

        {/* Back to Login */}
        <div className="text-center">
          <Link to="/login">
            <Button variant="ghost" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Voltar para o login
            </Button>
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}

export default ForgotPasswordPage;
