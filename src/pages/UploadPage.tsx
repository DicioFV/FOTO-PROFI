// src/pages/UploadPage.tsx
// CINEVISION AI — UPLOAD PAGE

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, Camera, Image, X, ArrowRight, Sparkles,
  CheckCircle, AlertCircle
} from 'lucide-react';
import { Button, Card, Badge, Progress } from '../components/ui';
import { useEditorStore } from '../store';
import { cn } from '../lib/utils';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function UploadPage() {
  const navigate = useNavigate();
  const { setInputImage, inputImage } = useEditorStore();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const validateFile = useCallback((file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return 'Formato não suportado. Use JPG, PNG ou WebP.';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'Arquivo muito grande. Máximo: 10MB.';
    }
    return null;
  }, []);

  const handleFile = useCallback(async (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 100);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      clearInterval(progressInterval);
      setUploadProgress(100);
      setInputImage(e.target?.result as string, file);
      setTimeout(() => {
        setIsUploading(false);
      }, 300);
    };
    reader.readAsDataURL(file);
  }, [validateFile, setInputImage]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const clearImage = useCallback(() => {
    setInputImage(null, null);
    setError(null);
  }, [setInputImage]);

  const proceedToEditor = useCallback(() => {
    navigate('/editor');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#050507] pt-16 pb-20">
      <div className="pl-64">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Badge variant="gold" className="mb-4">
                <Sparkles className="w-4 h-4 mr-1" />
                Passo 1 de 3
              </Badge>
              <h1 className="text-3xl font-bold text-white mb-2">
                Envie Sua Foto
              </h1>
              <p className="text-gray-400">
                Faça upload de uma foto ou tire uma selfie para começar a transformação
              </p>
            </motion.div>
          </div>

          {/* Upload Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {!inputImage ? (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card
                    variant="glass"
                    padding="none"
                    className={cn(
                      'relative overflow-hidden transition-all duration-300',
                      isDragging && 'ring-2 ring-amber-500'
                    )}
                  >
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      className="p-8"
                    >
                      {/* Drag Overlay */}
                      {isDragging && (
                        <div className="absolute inset-0 bg-amber-500/10 backdrop-blur-sm z-10 flex items-center justify-center">
                          <div className="text-center">
                            <Upload className="w-12 h-12 text-amber-400 mx-auto mb-2" />
                            <p className="text-lg font-medium text-white">Solte para enviar</p>
                          </div>
                        </div>
                      )}

                      {/* Upload Progress */}
                      {isUploading && (
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-10 flex items-center justify-center">
                          <div className="w-full max-w-xs px-4">
                            <p className="text-center text-white mb-4">Processando...</p>
                            <Progress value={uploadProgress} variant="gold" animated />
                          </div>
                        </div>
                      )}

                      {/* Main Upload Zone */}
                      <div className="aspect-video flex flex-col items-center justify-center border-2 border-dashed border-white/20 rounded-2xl hover:border-amber-500/50 transition-colors">
                        <div className="w-20 h-20 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-4">
                          <Image className="w-10 h-10 text-amber-400" />
                        </div>
                        <p className="text-lg font-medium text-white mb-2">
                          Arraste sua foto aqui
                        </p>
                        <p className="text-gray-500 mb-6">
                          ou clique para selecionar
                        </p>
                        <div className="flex items-center gap-4">
                          <label>
                            <input
                              type="file"
                              accept={ACCEPTED_TYPES.join(',')}
                              onChange={handleFileInput}
                              className="hidden"
                            />
                            <Button variant="primary" asChild>
                              <span>
                                <Upload className="w-4 h-4 mr-2" />
                                Escolher Arquivo
                              </span>
                            </Button>
                          </label>
                          <Button variant="outline">
                            <Camera className="w-4 h-4 mr-2" />
                            Usar Câmera
                          </Button>
                        </div>
                      </div>

                      {/* Error Message */}
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3"
                        >
                          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                          <p className="text-red-400">{error}</p>
                        </motion.div>
                      )}

                      {/* Specs */}
                      <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
                        <span>JPG, PNG, WebP</span>
                        <span>•</span>
                        <span>Máximo 10MB</span>
                        <span>•</span>
                        <span>Mínimo 256×256</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card variant="glass" padding="lg">
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Image Preview */}
                      <div className="flex-1">
                        <div className="relative rounded-2xl overflow-hidden bg-black/50">
                          <img
                            src={inputImage}
                            alt="Preview"
                            className="w-full h-auto max-h-[500px] object-contain"
                          />
                          <button
                            onClick={clearImage}
                            className="absolute top-4 right-4 p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Info & Actions */}
                      <div className="lg:w-80 flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-emerald-400" />
                          </div>
                          <div>
                            <p className="font-medium text-white">Foto Carregada</p>
                            <p className="text-sm text-gray-500">Pronta para transformar</p>
                          </div>
                        </div>

                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Qualidade</span>
                            <span className="text-emerald-400">Excelente</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Face Detectada</span>
                            <span className="text-emerald-400">Sim</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Iluminação</span>
                            <span className="text-emerald-400">Boa</span>
                          </div>
                        </div>

                        <div className="mt-auto space-y-3">
                          <Button
                            variant="gold"
                            size="lg"
                            className="w-full"
                            onClick={proceedToEditor}
                            rightIcon={<ArrowRight className="w-5 h-5" />}
                          >
                            Escolher Estilo
                          </Button>
                          <Button variant="ghost" className="w-full" onClick={clearImage}>
                            Trocar Foto
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              Dicas para Melhores Resultados
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { emoji: '💡', title: 'Boa Iluminação', desc: 'Luz natural frontal é ideal' },
                { emoji: '👤', title: 'Rosto Visível', desc: 'Sem óculos escuros ou chapéus' },
                { emoji: '📐', title: 'Alta Resolução', desc: 'Quanto maior, melhor o resultado' },
              ].map((tip) => (
                <Card key={tip.title} variant="default" padding="md">
                  <span className="text-2xl mb-2 block">{tip.emoji}</span>
                  <p className="font-medium text-white">{tip.title}</p>
                  <p className="text-sm text-gray-500">{tip.desc}</p>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
