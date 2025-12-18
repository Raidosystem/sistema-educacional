-- Script para corrigir políticas RLS e permitir login
-- Execute este script no SQL Editor do Supabase

-- Remover políticas existentes se houver
DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;

-- Criar políticas RLS mais permissivas para depuração
CREATE POLICY "Allow authenticated users to view users" ON users 
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to view people" ON people 
  FOR SELECT USING (auth.role() = 'authenticated');

-- Permitir que usuários vejam suas próprias informações
CREATE POLICY "Users can view own profile" ON users 
  FOR SELECT USING (auth.uid() = id);

-- Permitir que usuários vejam informações de pessoas relacionadas
CREATE POLICY "Users can view related people" ON people 
  FOR SELECT USING (
    id IN (
      SELECT person_id FROM users WHERE id = auth.uid()
    )
  );

-- Verificar se o usuário admin existe
SELECT 
  u.id,
  u.email,
  u.role,
  u.person_id,
  p.name
FROM users u
LEFT JOIN people p ON u.person_id = p.id
WHERE u.email = 'admin@escola.com';
