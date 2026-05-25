// src/components/auth/PasswordStrength.tsx
// CINEVISION AI — PASSWORD STRENGTH INDICATOR

import { useMemo } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PasswordStrengthProps {
  password: string;
  showRequirements?: boolean;
}

interface Requirement {
  label: string;
  test: (password: string) => boolean;
}

const requirements: Requirement[] = [
  { label: 'Mínimo 8 caracteres', test: (p) => p.length >= 8 },
  { label: 'Uma letra maiúscula', test: (p) => /[A-Z]/.test(p) },
  { label: 'Uma letra minúscula', test: (p) => /[a-z]/.test(p) },
  { label: 'Um número', test: (p) => /[0-9]/.test(p) },
  { label: 'Um caractere especial', test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
];

export function PasswordStrength({ password, showRequirements = true }: PasswordStrengthProps) {
  const { score, strength, color, bgColor } = useMemo(() => {
    if (!password) {
      return { score: 0, strength: '', color: '', bgColor: 'bg-white/10' };
    }

    const passedRequirements = requirements.filter((r) => r.test(password)).length;
    const score = (passedRequirements / requirements.length) * 100;

    if (score <= 20) {
      return { score, strength: 'Muito fraca', color: 'text-red-400', bgColor: 'bg-red-500' };
    } else if (score <= 40) {
      return { score, strength: 'Fraca', color: 'text-orange-400', bgColor: 'bg-orange-500' };
    } else if (score <= 60) {
      return { score, strength: 'Média', color: 'text-yellow-400', bgColor: 'bg-yellow-500' };
    } else if (score <= 80) {
      return { score, strength: 'Boa', color: 'text-lime-400', bgColor: 'bg-lime-500' };
    } else {
      return { score, strength: 'Excelente', color: 'text-emerald-400', bgColor: 'bg-emerald-500' };
    }
  }, [password]);

  if (!password) return null;

  return (
    <div className="space-y-3">
      {/* Strength Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Força da senha</span>
          <span className={cn('font-medium', color)}>{strength}</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className={cn('h-full transition-all duration-300 rounded-full', bgColor)}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Requirements List */}
      {showRequirements && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {requirements.map((req) => {
            const passed = req.test(password);
            return (
              <div
                key={req.label}
                className={cn(
                  'flex items-center gap-2 text-xs transition-colors',
                  passed ? 'text-emerald-400' : 'text-gray-500'
                )}
              >
                {passed ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <X className="w-3.5 h-3.5" />
                )}
                {req.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PasswordStrength;
