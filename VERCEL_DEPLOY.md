# Configuração de Environment Variables para Vercel

## 🌍 **Variáveis de Ambiente para Produção**

### **Frontend (Vercel)**
```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://bljbeonwfasdttivdtpf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsamJlb253ZmFzZHR0aXZkdHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNDAwMjMsImV4cCI6MjA3MDcxNjAyM30.Z0RexBTLhbIkmu3-DS6l6xr2nxzSaOQJfX3lrqqmNpE

# App Configuration
VITE_APP_NAME=Sistema Municipal de Ensino
VITE_APP_VERSION=1.0.0
VITE_API_URL=https://api.sistema-ensino.com.br
```

### **Backend (Vercel Functions)**
```bash
# Database
DATABASE_URL=postgresql://postgres.bljbeonwfasdttivdtpf:YOUR_DB_PASSWORD@aws-0-us-east-1.pooler.supabase.com:6543/postgres
SUPABASE_URL=https://bljbeonwfasdttivdtpf.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsamJlb253ZmFzZHR0aXZkdHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNDAwMjMsImV4cCI6MjA3MDcxNjAyM30.Z0RexBTLhbIkmu3-DS6l6xr2nxzSaOQJfX3lrqqmNpE
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY

# JWT
JWT_SECRET=super-secret-jwt-key-for-production-change-this
JWT_EXPIRES_IN=7d

# Server
NODE_ENV=production
PORT=3000
```

## 📋 **Comandos para Deploy Vercel**

### **1. Instalar Vercel CLI**
```bash
npm install -g vercel
```

### **2. Fazer Login**
```bash
vercel login
```

### **3. Deploy Inicial**
```bash
vercel --prod
```

### **4. Configurar Variáveis de Ambiente**
```bash
# Frontend
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production
vercel env add VITE_APP_NAME production
vercel env add VITE_APP_VERSION production

# Backend (se usando serverless functions)
vercel env add DATABASE_URL production
vercel env add SUPABASE_URL production
vercel env add SUPABASE_ANON_KEY production
vercel env add JWT_SECRET production
```

### **5. Deploy com Variáveis**
```bash
vercel --prod
```

## 🔧 **Configuração Manual no Dashboard Vercel**

1. Acesse: https://vercel.com/dashboard
2. Encontre seu projeto "Sistema-escola"
3. Vá em Settings → Environment Variables
4. Adicione cada variável manualmente:

| Nome | Valor | Environment |
|------|-------|-------------|
| VITE_SUPABASE_URL | https://bljbeonwfasdttivdtpf.supabase.co | Production |
| VITE_SUPABASE_ANON_KEY | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... | Production |
| VITE_APP_NAME | Sistema Municipal de Ensino | Production |
| VITE_APP_VERSION | 1.0.0 | Production |

## 🚀 **Processo de Deploy Automático**

Com o Git conectado ao Vercel:
1. ✅ Push para `main` → Deploy automático
2. ✅ Pull Request → Preview deploy
3. ✅ Rollback automático em caso de erro
4. ✅ SSL automático
5. ✅ CDN global
