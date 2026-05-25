// src/pages/SettingsPage.tsx
// CINEVISION AI — SETTINGS PAGE

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Save, Camera } from 'lucide-react';
import { Button, Card, CardHeader, CardContent, Input, Switch, Select, Avatar, Tabs, TabContent, Alert } from '../components/ui';
import { useAuthStore } from '../store';

export function SettingsPage() {
  const user = useAuthStore(s => s.user);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.fullName || 'Usuário Demo',
    email: user?.email || 'user@demo.com',
    username: 'demo_user',
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    generationDone: true,
    creditsLow: true,
    newStyles: true,
  });

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  const tabs = [
    { value: 'profile', label: '👤 Perfil' },
    { value: 'notifications', label: '🔔 Notificações' },
    { value: 'preferences', label: '🎨 Preferências' },
    { value: 'security', label: '🔒 Segurança' },
  ];

  return (
    <div className="min-h-screen bg-[#050507] pt-16 pb-20">
      <div className="pl-64">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-1">Configurações</h1>
            <p className="text-gray-400">Gerencie sua conta e preferências</p>
          </motion.div>

          {saved && <Alert variant="success" className="mb-6">Configurações salvas com sucesso!</Alert>}

          <Tabs tabs={tabs} value="profile" variant="underline">
            {/* Profile */}
            <TabContent value="profile">
              <Card padding="lg">
                <CardHeader title="Informações Pessoais" />
                <CardContent>
                  <div className="space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <Avatar size="2xl" fallback={profile.name.slice(0, 2)} />
                        <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-black">
                          <Camera className="w-4 h-4" />
                        </button>
                      </div>
                      <div>
                        <p className="font-medium text-white">{profile.name}</p>
                        <p className="text-sm text-gray-500">{profile.email}</p>
                      </div>
                    </div>

                    <Input label="Nome completo" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} />
                    <Input label="Email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} type="email" />
                    <Input label="Username" value={profile.username} onChange={e => setProfile(p => ({ ...p, username: e.target.value }))} leftIcon={<span className="text-gray-500">@</span>} />

                    <Button variant="gold" onClick={handleSave} leftIcon={<Save className="w-4 h-4" />}>Salvar Alterações</Button>
                  </div>
                </CardContent>
              </Card>
            </TabContent>

            {/* Notifications */}
            <TabContent value="notifications">
              <Card padding="lg">
                <CardHeader title="Notificações" description="Controle como você recebe alertas" />
                <CardContent>
                  <div className="space-y-5">
                    <Switch checked={notifications.email} onCheckedChange={v => setNotifications(n => ({ ...n, email: v }))} label="Notificações por Email" description="Receba atualizações no seu email" />
                    <Switch checked={notifications.push} onCheckedChange={v => setNotifications(n => ({ ...n, push: v }))} label="Push Notifications" description="Notificações no navegador" />
                    <div className="border-t border-white/10 pt-5">
                      <p className="text-sm font-medium text-gray-400 mb-4">Eventos</p>
                      <div className="space-y-4">
                        <Switch checked={notifications.generationDone} onCheckedChange={v => setNotifications(n => ({ ...n, generationDone: v }))} label="Geração concluída" description="Quando sua imagem estiver pronta" />
                        <Switch checked={notifications.creditsLow} onCheckedChange={v => setNotifications(n => ({ ...n, creditsLow: v }))} label="Créditos baixos" description="Quando restarem poucos créditos" />
                        <Switch checked={notifications.newStyles} onCheckedChange={v => setNotifications(n => ({ ...n, newStyles: v }))} label="Novos estilos" description="Quando novos estilos forem adicionados" />
                        <Switch checked={notifications.marketing} onCheckedChange={v => setNotifications(n => ({ ...n, marketing: v }))} label="Marketing" description="Promoções e ofertas especiais" />
                      </div>
                    </div>
                    <Button variant="gold" onClick={handleSave} leftIcon={<Save className="w-4 h-4" />}>Salvar</Button>
                  </div>
                </CardContent>
              </Card>
            </TabContent>

            {/* Preferences */}
            <TabContent value="preferences">
              <Card padding="lg">
                <CardHeader title="Preferências" />
                <CardContent>
                  <div className="space-y-5">
                    <Select label="Idioma" value="pt-BR" options={[{ value: 'pt-BR', label: '🇧🇷 Português (BR)' }, { value: 'en-US', label: '🇺🇸 English' }, { value: 'es', label: '🇪🇸 Español' }]} />
                    <Select label="Modelo padrão" value="flux-pro" options={[{ value: 'flux-schnell', label: '⚡ Flux Schnell' }, { value: 'flux-pro', label: '🎬 Flux Pro' }, { value: 'portrait', label: '👤 Portrait Master' }]} />
                    <Select label="Resolução padrão" value="1024" options={[{ value: '512', label: '512×512' }, { value: '1024', label: '1024×1024' }, { value: '2048', label: '2048×2048' }]} />
                    <Select label="Formato padrão de download" value="png" options={[{ value: 'png', label: 'PNG' }, { value: 'jpg', label: 'JPG' }, { value: 'webp', label: 'WebP' }]} />
                    <Button variant="gold" onClick={handleSave} leftIcon={<Save className="w-4 h-4" />}>Salvar</Button>
                  </div>
                </CardContent>
              </Card>
            </TabContent>

            {/* Security */}
            <TabContent value="security">
              <Card padding="lg">
                <CardHeader title="Segurança" />
                <CardContent>
                  <div className="space-y-5">
                    <Input label="Senha atual" type="password" placeholder="••••••••" />
                    <Input label="Nova senha" type="password" placeholder="••••••••" />
                    <Input label="Confirmar nova senha" type="password" placeholder="••••••••" />
                    <Button variant="gold" leftIcon={<Shield className="w-4 h-4" />}>Alterar Senha</Button>

                    <div className="border-t border-white/10 pt-5">
                      <h4 className="text-sm font-medium text-red-400 mb-3">Zona de Perigo</h4>
                      <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                        <div>
                          <p className="font-medium text-white">Excluir Conta</p>
                          <p className="text-sm text-gray-500">Ação irreversível. Todos os dados serão perdidos.</p>
                        </div>
                        <Button variant="danger" size="sm">Excluir</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
