// src/pages/ExportsPage.tsx
// CINEVISION AI — EXPORTS & DOWNLOADS PAGE

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Package, Clock, FileImage, CheckCircle, Trash2 } from 'lucide-react';
import { Button, Card, CardHeader, CardContent, Badge } from '../components/ui';
import { BatchExport } from '../components/export';
import { cn } from '../lib/utils';

interface DownloadItem {
  id: string;
  fileName: string;
  format: string;
  size: string;
  resolution: string;
  createdAt: Date;
  imageUrl: string;
}

const mockDownloads: DownloadItem[] = [
  { id: '1', fileName: 'hollywood-portrait', format: 'PNG', size: '3.2 MB', resolution: '1024×1024', createdAt: new Date(Date.now() - 300000), imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
  { id: '2', fileName: 'instagram-glow', format: 'JPG', size: '1.8 MB', resolution: '1080×1350', createdAt: new Date(Date.now() - 3600000), imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
  { id: '3', fileName: 'youtube-thumb', format: 'PNG', size: '2.1 MB', resolution: '1280×720', createdAt: new Date(Date.now() - 7200000), imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200' },
  { id: '4', fileName: 'cyberpunk-neon', format: 'WebP', size: '1.4 MB', resolution: '1024×1024', createdAt: new Date(Date.now() - 86400000), imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200' },
];

const batchItems = [
  { id: '1', name: 'Hollywood Portrait', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
  { id: '2', name: 'Instagram Glow', imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
  { id: '3', name: 'YouTube Thumbnail', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200' },
  { id: '4', name: 'Cyberpunk Neon', imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200' },
];

function timeAgo(date: Date): string {
  const diff = Date.now() - date.getTime();
  const min = Math.floor(diff / 60000);
  const hr = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (min < 60) return `${min}min atrás`;
  if (hr < 24) return `${hr}h atrás`;
  return `${d}d atrás`;
}

export function ExportsPage() {
  const [activeView, setActiveView] = useState<'downloads' | 'batch'>('downloads');

  return (
    <div className="min-h-screen bg-[#050507] pt-16 pb-20">
      <div className="pl-64">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">Exportações</h1>
              <p className="text-gray-400">{mockDownloads.length} downloads recentes</p>
            </div>
            <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
              <button
                onClick={() => setActiveView('downloads')}
                className={cn('px-4 py-2 rounded-lg text-sm font-medium transition-all', activeView === 'downloads' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white')}
              >
                <Download className="w-4 h-4 inline mr-1.5" />Downloads
              </button>
              <button
                onClick={() => setActiveView('batch')}
                className={cn('px-4 py-2 rounded-lg text-sm font-medium transition-all', activeView === 'batch' ? 'bg-amber-500 text-black' : 'text-gray-400 hover:text-white')}
              >
                <Package className="w-4 h-4 inline mr-1.5" />Lote
              </button>
            </div>
          </div>

          {activeView === 'downloads' ? (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <Card padding="md" className="text-center">
                  <p className="text-3xl font-bold text-white">{mockDownloads.length}</p>
                  <p className="text-sm text-gray-500">Downloads</p>
                </Card>
                <Card padding="md" className="text-center">
                  <p className="text-3xl font-bold text-amber-400">8.5 MB</p>
                  <p className="text-sm text-gray-500">Total</p>
                </Card>
                <Card padding="md" className="text-center">
                  <p className="text-3xl font-bold text-emerald-400">PNG</p>
                  <p className="text-sm text-gray-500">Formato favorito</p>
                </Card>
              </div>

              {/* Downloads List */}
              <Card>
                <CardHeader title="Downloads Recentes" action={
                  <Button variant="ghost" size="sm" leftIcon={<Trash2 className="w-4 h-4" />}>Limpar</Button>
                } />
                <CardContent>
                  <div className="space-y-2">
                    {mockDownloads.map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 transition-all group"
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                          <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white truncate">{item.fileName}.{item.format.toLowerCase()}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><FileImage className="w-3 h-3" />{item.format}</span>
                            <span>{item.size}</span>
                            <span>{item.resolution}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-3.5 h-3.5" />
                          {timeAgo(item.createdAt)}
                        </div>
                        <Badge variant="success" size="sm">
                          <CheckCircle className="w-3 h-3 mr-1" />Baixado
                        </Badge>
                        <Button variant="ghost" size="sm" leftIcon={<Download className="w-4 h-4" />}>
                          Baixar
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Batch Export */
            <BatchExport
              items={batchItems}
              onExportAll={(ids) => console.log('Batch export:', ids)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ExportsPage;
