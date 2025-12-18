# Guia de Instalação - Sistema Municipal de Ensino

## 🚀 Instalação Rápida

### Pré-requisitos
- Node.js 18+ 
- PostgreSQL 14+
- Git

### 1. Clone o Repositório
```bash
git clone <repository-url>
cd sistema-municipal-ensino
```

### 2. Instale as Dependências
```bash
npm run setup
```

### 3. Configure o Banco de Dados

Crie um banco PostgreSQL:
```sql
CREATE DATABASE sistema_escola;
CREATE USER escola WITH PASSWORD 'escola123';
GRANT ALL PRIVILEGES ON DATABASE sistema_escola TO escola;
```

Configure as variáveis de ambiente:
```bash
cp backend/.env.example backend/.env
```

Edite o arquivo `backend/.env`:
```env
DATABASE_URL="postgresql://escola:escola123@localhost:5432/sistema_escola"
JWT_SECRET="seu-jwt-secret-aqui"
```

### 4. Configure o Banco
```bash
cd backend
npm run db:generate
npm run db:push
npm run db:seed
```

### 5. Inicie o Sistema
```bash
npm run dev
```

Acesse:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Documentação: http://localhost:3001/docs

## 🐳 Instalação com Docker

```bash
docker-compose up -d
```

## 🔐 Usuários de Teste

- **Admin**: admin@escola.com / 123456
- **Professor**: professor@escola.com / 123456  
- **Pai/Responsável**: pai@escola.com / 123456
- **Aluno**: aluno@escola.com / 123456
- **Nutricionista**: nutricionista@escola.com / 123456

## 📁 Estrutura de Arquivos

```
sistema-municipal-ensino/
├── backend/                 # API Node.js
│   ├── src/
│   │   ├── controllers/     # Controladores
│   │   ├── routes/          # Rotas da API
│   │   ├── middleware/      # Middlewares
│   │   ├── utils/           # Utilitários
│   │   └── database/        # Scripts do banco
│   ├── prisma/              # Schema Prisma
│   └── package.json
├── frontend/                # Interface React
│   ├── src/
│   │   ├── components/      # Componentes
│   │   ├── pages/           # Páginas
│   │   ├── store/           # Estado global
│   │   └── main.tsx
│   └── package.json
├── docker-compose.yml       # Docker Compose
└── README.md
```

## 🎯 Funcionalidades Implementadas

### ✅ Módulos Básicos
- [x] Sistema de autenticação
- [x] Dashboard administrativo
- [x] Gestão de Escolas
- [x] Módulo Secretário (completo)
- [x] Estrutura base dos módulos
- [x] Layout responsivo
- [x] Banco de dados completo

### 🚧 Módulos em Desenvolvimento
- [x] Gestão de Escolas (CONCLUÍDO)
- [ ] Gestão completa de estudantes
- [ ] Portal do professor
- [ ] Portal dos pais
- [ ] Central de vagas
- [ ] Gestão de alimentação

## 📚 Scripts Disponíveis

### Projeto Principal
```bash
npm run dev          # Inicia frontend e backend
npm run build        # Build completo
npm run setup        # Instala dependências
npm run db:setup     # Configura banco
```

### Backend
```bash
cd backend
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run db:generate  # Gera cliente Prisma
npm run db:migrate   # Executa migrações
npm run db:seed      # Popula banco com dados
```

### Frontend  
```bash
cd frontend
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
```

## 🔧 Configuração Avançada

### Variáveis de Ambiente (Backend)
```env
# Banco de dados
DATABASE_URL="postgresql://user:pass@localhost:5432/db"

# JWT
JWT_SECRET="seu-secret-super-secreto"
JWT_EXPIRES_IN="7d"

# Servidor
PORT=3001
NODE_ENV="development"

# Email (opcional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="seu-email@gmail.com"
SMTP_PASS="sua-senha"

# Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH="./uploads"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGIN="http://localhost:3000"
```

## 🐛 Solução de Problemas

### Erro de Conexão com Banco
```bash
# Verifique se o PostgreSQL está rodando
sudo service postgresql status

# Teste a conexão
psql -h localhost -U escola -d sistema_escola
```

### Erro de Permissão
```bash
# Limpe cache e reinstale
rm -rf node_modules package-lock.json
npm install
```

### Erro de Build
```bash
# Backend
cd backend && npm run build

# Frontend  
cd frontend && npm run build
```

## 📞 Suporte

Para suporte técnico:
- 📧 Email: suporte@sistema-municipal.com.br
- 📱 WhatsApp: (xx) xxxx-xxxx
- 📖 Documentação: /docs

---

⭐ **Sistema Municipal de Ensino** - Gestão educacional completa e moderna.
