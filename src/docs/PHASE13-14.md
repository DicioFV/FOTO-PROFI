# CINEVISION AI — FASES 13 & 14 COMPLETAS

## Fase 13 — Sistema de Créditos ✅
## Fase 14 — Pagamentos & Planos ✅

### CreditsPage
- Saldo atual com barra de progresso
- Badge de plano (Free/Starter/Pro/Agency)
- Stats: Usados, Comprados, Gerações, Economia
- Tabs: Visão Geral, Extrato, Comprar
- Extrato com 8 transações mock:
  - Geração (-1, -2 créditos)
  - Compra (+50)
  - Bônus de referência (+10)
  - Reembolso (+2)
  - Renovação mensal (+200)
- Ícones e cores por tipo de transação
- 4 pacotes de créditos avulsos (10/25/50/100)
- Desconto progressivo (20-40% off)

### PricingPage
- Toggle Mensal/Anual com badge "Economize 25%"
- 4 planos completos (Free/Starter/Pro/Agency)
- Cada plano com:
  - Preço mensal e anual
  - Créditos
  - Lista de features (included/not included)
  - CTA diferenciado
- Destaque "Mais Popular" no plano Pro
- 6 FAQs com Accordion animado:
  - Cancelamento
  - Acúmulo de créditos
  - Upgrade/Downgrade
  - Marca d'água
  - API
  - Formas de pagamento
- CTA final para suporte

### SettingsPage
- 4 tabs: Perfil, Notificações, Preferências, Segurança
- **Perfil**: Avatar com upload, nome, email, username
- **Notificações**: 6 toggles Switch:
  - Email, Push
  - Geração concluída, Créditos baixos
  - Novos estilos, Marketing
- **Preferências**: Selects para:
  - Idioma (PT-BR, EN, ES)
  - Modelo IA padrão
  - Resolução padrão
  - Formato de download
- **Segurança**:
  - Alteração de senha
  - Zona de perigo (excluir conta)

### Páginas Criadas: 3
- CreditsPage (créditos + extrato + comprar)
- PricingPage (planos + FAQ)
- SettingsPage (perfil + notificações + segurança)

### Rotas Atualizadas
- `/pricing` → PricingPage (pública)
- `/credits` → CreditsPage (protegida)
- `/settings` → SettingsPage (protegida)
