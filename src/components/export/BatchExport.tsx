// src/components/export/BatchExport.tsx
// CINEVISION AI — BATCH EXPORT COMPONENT

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Check, X, Loader } from 'lucide-react';
import { Button, Card, CardHeader, CardContent, Progress, Checkbox } from '../ui';
import { cn } from '../../lib/utils';

interface BatchItem {
  id: string;
  name: string;
  imageUrl: string;
  selected: boolean;
  status: 'idle' | 'exporting' | 'done' | 'error';
}

interface BatchExportProps {
  items: { id: string; name: string; imageUrl: string }[];
  onExportAll?: (ids: string[]) => void;
  className?: string;
}

export function BatchExport({ items: initialItems, onExportAll, className }: BatchExportProps) {
  const [items, setItems] = useState<BatchItem[]>(
    initialItems.map(item => ({ ...item, selected: true, status: 'idle' }))
  );
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const selectedCount = items.filter(i => i.selected).length;
  const allSelected = selectedCount === items.length;

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, selected: !i.selected } : i));
  };

  const toggleAll = () => {
    setItems(prev => prev.map(i => ({ ...i, selected: !allSelected })));
  };

  const handleExportAll = async () => {
    const selectedIds = items.filter(i => i.selected).map(i => i.id);
    if (selectedIds.length === 0) return;

    setIsExporting(true);
    setProgress(0);

    for (let i = 0; i < selectedIds.length; i++) {
      const id = selectedIds[i];
      setItems(prev => prev.map(item =>
        item.id === id ? { ...item, status: 'exporting' } : item
      ));

      await new Promise(r => setTimeout(r, 800));

      setItems(prev => prev.map(item =>
        item.id === id ? { ...item, status: 'done' } : item
      ));

      setProgress(((i + 1) / selectedIds.length) * 100);
    }

    setIsExporting(false);
    onExportAll?.(selectedIds);
  };

  return (
    <Card className={className}>
      <CardHeader
        title="Exportação em Lote"
        description={`${selectedCount} de ${items.length} selecionados`}
        action={
          <Button variant="ghost" size="sm" onClick={toggleAll}>
            {allSelected ? 'Desmarcar todos' : 'Selecionar todos'}
          </Button>
        }
      />
      <CardContent>
        {/* Progress */}
        {isExporting && (
          <div className="mb-4">
            <Progress value={progress} variant="gold" size="md" animated />
            <p className="text-sm text-center text-gray-400 mt-2">
              Exportando {Math.round(progress)}%...
            </p>
          </div>
        )}

        {/* Items */}
        <div className="space-y-2 mb-4 max-h-[400px] overflow-y-auto">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              className={cn(
                'flex items-center gap-3 p-3 rounded-xl border transition-all',
                item.selected ? 'bg-white/[0.03] border-white/10' : 'bg-transparent border-transparent opacity-50'
              )}
            >
              <Checkbox
                checked={item.selected}
                onCheckedChange={() => toggleItem(item.id)}
                disabled={isExporting}
              />
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
                <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="flex-1 text-sm text-white truncate">{item.name}</span>

              {item.status === 'exporting' && <Loader className="w-4 h-4 text-amber-400 animate-spin" />}
              {item.status === 'done' && <Check className="w-4 h-4 text-emerald-400" />}
              {item.status === 'error' && <X className="w-4 h-4 text-red-400" />}
            </motion.div>
          ))}
        </div>

        {/* Export Button */}
        <Button
          variant="gold"
          className="w-full"
          size="lg"
          onClick={handleExportAll}
          disabled={selectedCount === 0 || isExporting}
          isLoading={isExporting}
          leftIcon={<Package className="w-5 h-5" />}
        >
          {isExporting
            ? 'Exportando...'
            : `Exportar ${selectedCount} ${selectedCount === 1 ? 'imagem' : 'imagens'}`}
        </Button>
      </CardContent>
    </Card>
  );
}

export default BatchExport;
