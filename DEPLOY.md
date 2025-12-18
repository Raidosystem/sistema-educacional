# Guia de Deploy - Sistema Educacional Guaíra/SP

## ✅ Projeto Pronto para Deploy

O projeto está completamente limpo de dependências Spark e pronto para deploy em qualquer plataforma.

## 🚀 Opções de Deploy

### 1. Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy em produção
vercel --prod
```

Ou via interface web:
1. Acesse [vercel.com](https://vercel.com)
2. Conecte seu repositório GitHub
3. Configure:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Framework: `Vite`
4. Deploy automático!

### 2. Netlify

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Deploy em produção
netlify deploy --prod
```

Ou via interface web:
1. Acesse [netlify.com](https://netlify.com)
2. Conecte seu repositório GitHub
3. As configurações serão lidas do `netlify.toml`
4. Deploy automático!

### 3. GitHub Pages

```bash
# Instalar gh-pages
npm install --save-dev gh-pages

# Adicionar script ao package.json:
# "deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

### 4. Deploy Manual (Servidor Próprio)

```bash
# Build de produção
npm run build

# A pasta dist/ contém todos os arquivos estáticos
# Copie o conteúdo de dist/ para seu servidor web
```

Configuração do servidor (nginx exemplo):
```nginx
server {
    listen 80;
    server_name seu-dominio.com;
    root /var/www/sistema-educacional/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 📋 Checklist Pré-Deploy

- ✅ Dependências Spark removidas
- ✅ Build de produção funcionando (`npm run build`)
- ✅ Todos os tipos TypeScript corrigidos
- ✅ Repositório Git inicializado
- ✅ Arquivos de configuração criados (vercel.json, netlify.toml)
- ✅ .gitignore configurado

## 🔗 Push para GitHub

```bash
# Criar repositório no GitHub primeiro, depois:
git remote add origin https://github.com/seu-usuario/sistema-educacional.git
git branch -M main
git push -u origin main
```

## 📊 Informações do Build

- **Bundle Size**: ~794 KB (minificado)
- **CSS**: ~389 KB
- **Framework**: React 19 + Vite 7
- **Target**: ES2020
- **Output**: dist/

## 🌐 Variáveis de Ambiente

Se precisar de variáveis de ambiente, crie `.env.production`:

```env
VITE_API_URL=https://api.exemplo.com
VITE_APP_NAME=Sistema Educacional Guaíra
```

## ⚡ Performance

Build otimizado com:
- Code splitting automático
- Minificação de JS e CSS
- Tree shaking
- Assets otimizados

**Nota**: O build está gerando um warning sobre chunk size > 500KB. Considere implementar code splitting dinâmico com `React.lazy()` se necessário otimizar ainda mais.
