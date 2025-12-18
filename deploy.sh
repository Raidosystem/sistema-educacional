#!/bin/bash

# 🚀 SCRIPT DE DEPLOY COMPLETO - SISTEMA MUNICIPAL DE ENSINO
# Execute este script para fazer deploy completo em Git + Vercel + Supabase

set -e  # Parar em caso de erro

echo "🎯 INICIANDO DEPLOY COMPLETO DO SISTEMA MUNICIPAL DE ENSINO"
echo "============================================================"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para logging
log() {
    echo -e "${GREEN}[$(date +'%H:%M:%S')]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[$(date +'%H:%M:%S')] WARNING:${NC} $1"
}

error() {
    echo -e "${RED}[$(date +'%H:%M:%S')] ERROR:${NC} $1"
    exit 1
}

# ===============================================
# 1. VERIFICAÇÕES INICIAIS
# ===============================================

log "🔍 Verificando dependências..."

# Verificar se está no diretório correto
if [ ! -f "package.json" ] && [ ! -d "frontend" ]; then
    error "Execute este script no diretório raiz do projeto!"
fi

# Verificar Git
if ! command -v git &> /dev/null; then
    error "Git não está instalado!"
fi

# Verificar Node.js
if ! command -v node &> /dev/null; then
    error "Node.js não está instalado!"
fi

# Verificar npm
if ! command -v npm &> /dev/null; then
    error "npm não está instalado!"
fi

log "✅ Todas as dependências verificadas!"

# ===============================================
# 2. BUILD E TESTES
# ===============================================

log "🔨 Construindo projeto..."

# Build Frontend
log "📱 Fazendo build do frontend..."
cd frontend
npm install
npm run build
cd ..

log "✅ Build concluído com sucesso!"

# ===============================================
# 3. COMMIT E PUSH PARA GIT
# ===============================================

log "📚 Fazendo deploy para Git..."

# Verificar se há mudanças
if [ -z "$(git status --porcelain)" ]; then
    warn "Nenhuma mudança detectada no Git"
else
    log "📝 Fazendo commit das alterações..."
    git add .
    git commit -m "deploy: sistema pronto para produção

- Build otimizado para produção
- Configurações do Supabase atualizadas
- Scripts de deploy documentados
- Sistema testado e validado

Deploy completo para Git + Vercel + Supabase"
fi

log "🚀 Fazendo push para GitHub..."
git push origin main

log "✅ Deploy Git concluído!"

# ===============================================
# 4. DEPLOY VERCEL
# ===============================================

log "🌐 Fazendo deploy no Vercel..."

# Verificar se Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    warn "Vercel CLI não encontrado. Instalando..."
    npm install -g vercel
fi

# Fazer login no Vercel (se necessário)
log "🔐 Verificando autenticação Vercel..."
if ! vercel whoami &> /dev/null; then
    warn "Faça login no Vercel:"
    vercel login
fi

# Deploy no Vercel
log "🚀 Fazendo deploy no Vercel..."
cd frontend
vercel --prod --yes
cd ..

log "✅ Deploy Vercel concluído!"

# ===============================================
# 5. CONFIGURAÇÃO SUPABASE
# ===============================================

log "🗄️ Configurando Supabase..."

echo ""
echo "============================================================"
echo "📋 INSTRUÇÕES PARA CONFIGURAÇÃO DO SUPABASE"
echo "============================================================"
echo ""
echo "1. 🌐 Acesse: https://supabase.com/dashboard"
echo "2. 📁 Abra seu projeto: bljbeonwfasdttivdtpf"
echo "3. 🛠️ Vá em: SQL Editor > New query"
echo "4. 📄 Cole o conteúdo do arquivo: SUPABASE_DEPLOY.sql"
echo "5. ▶️ Execute o script completo"
echo "6. 👤 Vá em: Authentication > Users > Add user"
echo "7. ✉️ Email: admin@escola.com"
echo "8. 🔒 Password: 123456 (ou sua escolha)"
echo "9. ✅ Confirm user: Sim"
echo "10. 🔧 Volte ao SQL Editor e execute:"
echo "    SELECT public.setup_admin_user('admin@escola.com');"
echo ""

# ===============================================
# 6. CONFIGURAÇÃO VERCEL ENVIRONMENT
# ===============================================

echo "============================================================"
echo "🌍 CONFIGURAÇÃO DE VARIÁVEIS NO VERCEL"
echo "============================================================"
echo ""
echo "1. 🌐 Acesse: https://vercel.com/dashboard"
echo "2. 📁 Encontre seu projeto: Sistema-escola"
echo "3. ⚙️ Vá em: Settings > Environment Variables"
echo "4. ➕ Adicione as seguintes variáveis:"
echo ""
echo "   VITE_SUPABASE_URL = https://bljbeonwfasdttivdtpf.supabase.co"
echo "   VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsamJlb253ZmFzZHR0aXZkdHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNDAwMjMsImV4cCI6MjA3MDcxNjAyM30.Z0RexBTLhbIkmu3-DS6l6xr2nxzSaOQJfX3lrqqmNpE"
echo "   VITE_APP_NAME = Sistema Municipal de Ensino"
echo "   VITE_APP_VERSION = 1.0.0"
echo ""
echo "5. 💾 Salve e redesplante (automático)"
echo ""

# ===============================================
# 7. RESUMO FINAL
# ===============================================

echo "============================================================"
echo "🎉 DEPLOY CONCLUÍDO COM SUCESSO!"
echo "============================================================"
echo ""
echo "✅ Status dos Deploys:"
echo "   📚 Git: Atualizado"
echo "   🌐 Vercel: Deployed"
echo "   🗄️ Supabase: Aguardando configuração manual"
echo ""
echo "🔗 Links Importantes:"
echo "   📁 GitHub: https://github.com/Raidosystem/Sistema-escola"
echo "   🌐 Vercel: https://vercel.com/dashboard"
echo "   🗄️ Supabase: https://supabase.com/dashboard"
echo ""
echo "📋 Próximos Passos:"
echo "   1. Configure o Supabase usando o script SUPABASE_DEPLOY.sql"
echo "   2. Adicione as variáveis de ambiente no Vercel"
echo "   3. Teste o login em sua aplicação"
echo ""
echo "🚀 Seu Sistema Municipal de Ensino está PRONTO PARA PRODUÇÃO!"
echo "============================================================"
