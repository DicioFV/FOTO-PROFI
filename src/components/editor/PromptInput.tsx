// src/components/editor/PromptInput.tsx
// CINEVISION AI — PROMPT INPUT COMPONENT

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, RefreshCw, ChevronDown, Lightbulb } from 'lucide-react';
import { Button } from '../ui';
import { Textarea } from '../ui/Textarea';
import { cn } from '../../lib/utils';

export interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate?: () => void;
  onEnhance?: () => void;
  isGenerating?: boolean;
  suggestions?: string[];
  className?: string;
}

const defaultSuggestions = [
  'iluminação cinematográfica dramática',
  'estilo retrato de revista',
  'atmosfera filme noir',
  'cores vibrantes e saturadas',
  'fundo desfocado bokeh',
  'luz dourada do pôr do sol',
];

export function PromptInput({
  value,
  onChange,
  onGenerate,
  onEnhance,
  isGenerating = false,
  suggestions = defaultSuggestions,
  className,
}: PromptInputProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleEnhance = async () => {
    setIsEnhancing(true);
    // Simulate AI enhancement
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const enhancedPrompt = value 
      ? `${value}, cinematic lighting, professional photography, 8K resolution, sharp focus, masterpiece`
      : 'professional cinematic portrait, dramatic lighting, 8K resolution, award-winning photography';
    
    onChange(enhancedPrompt);
    setIsEnhancing(false);
    onEnhance?.();
  };

  const addSuggestion = (suggestion: string) => {
    const newValue = value ? `${value}, ${suggestion}` : suggestion;
    onChange(newValue);
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Main Input */}
      <div className="relative">
        <Textarea
          value={value}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
          placeholder="Descreva como você quer sua foto... (opcional)"
          maxLength={500}
          showCount
          className="min-h-[120px]"
          hint="Dica: Seja específico sobre iluminação, estilo e atmosfera"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleEnhance}
          isLoading={isEnhancing}
          leftIcon={<Wand2 className="w-4 h-4" />}
        >
          Melhorar com IA
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSuggestions(!showSuggestions)}
          rightIcon={
            <ChevronDown className={cn(
              'w-4 h-4 transition-transform',
              showSuggestions && 'rotate-180'
            )} />
          }
        >
          <Lightbulb className="w-4 h-4 mr-1" />
          Sugestões
        </Button>

        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange('')}
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Limpar
          </Button>
        )}
      </div>

      {/* Suggestions */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-white/[0.03] border border-white/10">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => addSuggestion(suggestion)}
                  className="px-3 py-1.5 rounded-full text-sm text-gray-400 bg-white/5 hover:bg-amber-500/10 hover:text-amber-400 border border-white/10 hover:border-amber-500/30 transition-all"
                >
                  + {suggestion}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generate Button */}
      {onGenerate && (
        <Button
          variant="gold"
          size="lg"
          className="w-full"
          onClick={onGenerate}
          isLoading={isGenerating}
          leftIcon={<Sparkles className="w-5 h-5" />}
        >
          {isGenerating ? 'Gerando...' : 'Gerar Imagem'}
        </Button>
      )}
    </div>
  );
}

export default PromptInput;
