# Configuração do Supabase - Sistema Municipal de Ensino

## Passo 1: Executar o Script SQL no Supabase

1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Faça login em sua conta
3. Selecione seu projeto (se ainda não tiver, clique em "New project")
4. No painel lateral, vá em **SQL Editor**
5. Clique em **New query**
6. Copie todo o conteúdo do arquivo `supabase_setup.sql` e cole no editor
7. Clique em **Run** para executar o script

## Passo 2: Configurar RLS (Row Level Security)

O script já inclui políticas de RLS, mas você pode verificar:

1. Vá em **Authentication** > **Policies**
2. Verifique se as políticas foram criadas para cada tabela
3. Se necessário, ajuste as políticas conforme seus requisitos específicos

## Passo 3: Configurar Variáveis de Ambiente

### Frontend (.env)
```
VITE_SUPABASE_URL=https://bljbeonwfasdttivdtpf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsamJlb253ZmFzZHR0aXZkdHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNDAwMjMsImV4cCI6MjA3MDcxNjAyM30.Z0RexBTLhbIkmu3-DS6l6xr2nxzSaOQJfX3lrqqmNpE
```

### Backend (.env)
```
SUPABASE_URL=https://bljbeonwfasdttivdtpf.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsamJlb253ZmFzZHR0aXZkdHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNDAwMjMsImV4cCI6MjA3MDcxNjAyM30.Z0RexBTLhbIkmu3-DS6l6xr2nxzSaOQJfX3lrqqmNpE
DATABASE_URL=postgresql://postgres.bljbeonwfasdttivdtpf:[SUA_SENHA]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

## Passo 4: Configurar Vercel (Variáveis de Ambiente)

1. Acesse seu projeto no [Vercel Dashboard](https://vercel.com/dashboard)
2. Vá em **Settings** > **Environment Variables**
3. Adicione as seguintes variáveis:

```
VITE_SUPABASE_URL=https://bljbeonwfasdttivdtpf.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsamJlb253ZmFzZHR0aXZkdHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxNDAwMjMsImV4cCI6MjA3MDcxNjAyM30.Z0RexBTLhbIkmu3-DS6l6xr2nxzSaOQJfX3lrqqmNpE
```

## Passo 5: Criar Usuário Administrador Inicial

Após executar o script SQL, você pode criar um usuário administrador:

1. No Supabase Dashboard, vá em **Authentication** > **Users**
2. Clique em **Add user**
3. Preencha os dados:
   - Email: admin@escola.gov.br
   - Password: (escolha uma senha segura)
   - Role: admin (será configurado automaticamente via trigger)

## Passo 6: Testar a Aplicação

1. Faça o deploy no Vercel:
   ```bash
   git add .
   git commit -m "feat: integração completa com Supabase"
   git push origin main
   ```

2. Acesse sua aplicação no Vercel
3. Faça login com o usuário administrador criado
4. Teste as funcionalidades do sistema

## Estrutura do Banco de Dados

O sistema inclui as seguintes tabelas principais:

- **people**: Dados pessoais básicos
- **schools**: Escolas da rede municipal
- **users**: Usuários do sistema
- **students**: Alunos
- **teachers**: Professores
- **classes**: Turmas
- **subjects**: Disciplinas
- **enrollments**: Matrículas
- **grades**: Notas
- **attendance**: Frequência
- **queue_management**: Fila de vagas
- **menu_planning**: Planejamento de cardápio

## Recursos Habilitados

- ✅ Autenticação via Supabase Auth
- ✅ Row Level Security (RLS)
- ✅ Triggers automáticos
- ✅ Políticas de segurança
- ✅ Relacionamentos entre tabelas
- ✅ Tipos personalizados (ENUMs)

## Próximos Passos

1. Personalize as políticas RLS conforme necessário
2. Configure backup automático
3. Monitore o uso do banco de dados
4. Implemente logs de auditoria se necessário
