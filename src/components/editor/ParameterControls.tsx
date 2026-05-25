// src/components/editor/ParameterControls.tsx
// CINEVISION AI — GENERATION PARAMETER CONTROLS

import { Slider, Select, Switch } from '../ui';
import type { SelectOption } from '../ui';
import { cn } from '../../lib/utils';

export interface GenerationParams {
  resolution: string;
  creativity: number;
  faceStrength: number;
  enhanceDetails: boolean;
  model: string;
  aspectRatio: string;
}

interface ParameterControlsProps {
  params: GenerationParams;
  onChange: (params: Partial<GenerationParams>) => void;
  className?: string;
}

const resolutionOptions: SelectOption[] = [
  { value: '512', label: '512×512 — Rápido' },
  { value: '768', label: '768×768 — Padrão' },
  { value: '1024', label: '1024×1024 — HD' },
  { value: '1440', label: '1440×1440 — Full HD' },
  { value: '2048', label: '2048×2048 — 2K (Pro)' },
];

const modelOptions: SelectOption[] = [
  { value: 'flux-schnell', label: '⚡ Flux Schnell — Ultra rápido' },
  { value: 'flux-pro', label: '🎬 Flux Pro — Máxima qualidade' },
  { value: 'portrait-master', label: '👤 Portrait Master — Rostos' },
];

const aspectRatioOptions: SelectOption[] = [
  { value: '1:1', label: '1:1 — Quadrado' },
  { value: '4:5', label: '4:5 — Instagram' },
  { value: '16:9', label: '16:9 — YouTube' },
  { value: '9:16', label: '9:16 — TikTok / Stories' },
  { value: '2:3', label: '2:3 — Poster' },
  { value: '3:2', label: '3:2 — Paisagem' },
];

export function ParameterControls({ params, onChange, className }: ParameterControlsProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Model Selection */}
      <Select
        label="Modelo de IA"
        value={params.model}
        onValueChange={(model) => onChange({ model })}
        options={modelOptions}
      />

      {/* Resolution */}
      <Select
        label="Resolução"
        value={params.resolution}
        onValueChange={(resolution) => onChange({ resolution })}
        options={resolutionOptions}
      />

      {/* Aspect Ratio */}
      <Select
        label="Proporção"
        value={params.aspectRatio}
        onValueChange={(aspectRatio) => onChange({ aspectRatio })}
        options={aspectRatioOptions}
      />

      {/* Creativity */}
      <Slider
        label="Criatividade"
        value={[params.creativity]}
        onValueChange={([creativity]) => onChange({ creativity })}
        min={0}
        max={100}
        step={5}
        formatValue={(v) => {
          if (v < 30) return `${v}% Fiel`;
          if (v < 70) return `${v}% Balanceado`;
          return `${v}% Criativo`;
        }}
      />

      {/* Face Preservation */}
      <Slider
        label="Preservação Facial"
        value={[params.faceStrength]}
        onValueChange={([faceStrength]) => onChange({ faceStrength })}
        min={0}
        max={100}
        step={5}
        formatValue={(v) => `${v}%`}
      />

      {/* Enhance Details */}
      <Switch
        checked={params.enhanceDetails}
        onCheckedChange={(enhanceDetails) => onChange({ enhanceDetails })}
        label="Melhorar Detalhes"
        description="Aplica upscale e sharpening automático"
      />
    </div>
  );
}

export default ParameterControls;
