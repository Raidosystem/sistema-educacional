-- 🎯 DEPLOY FINAL SUPABASE - SISTEMA MUNICIPAL DE ENSINO
-- Execute este script completo no SQL Editor do Supabase

-- ===============================================
-- 1. VERIFICAÇÃO E LIMPEZA (se necessário)
-- ===============================================

-- Verificar se as tabelas já existem
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users') THEN
        RAISE NOTICE 'Tabelas já existem. Continuando com configuração...';
    ELSE
        RAISE NOTICE 'Criando estrutura do banco...';
    END IF;
END $$;

-- ===============================================
-- 2. POLÍTICAS RLS CORRIGIDAS
-- ===============================================

-- Remover políticas existentes se houver conflito
DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Allow authenticated users to view users" ON users;
DROP POLICY IF EXISTS "Allow authenticated users to view people" ON people;
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can view related people" ON people;

-- Políticas permissivas para permitir login
CREATE POLICY "Allow authenticated users to read users" ON users 
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to read people" ON people 
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow users to read own data" ON users 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Allow users to update own data" ON users 
  FOR UPDATE USING (auth.uid() = id);

-- Políticas para inserção (necessário para registro)
CREATE POLICY "Allow service role to insert users" ON users 
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow service role to insert people" ON people 
  FOR INSERT WITH CHECK (true);

-- ===============================================
-- 3. FUNÇÃO PARA HANDLE AUTH SIGNUP
-- ===============================================

-- Função que será chamada automaticamente quando um usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Inserir na tabela users quando um novo usuário é criado no auth.users
  INSERT INTO public.users (id, email, role, active)
  VALUES (
    NEW.id,
    NEW.email,
    'STUDENT', -- Role padrão, pode ser alterado depois
    true
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para executar a função automaticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ===============================================
-- 4. DADOS INICIAIS CORRIGIDOS
-- ===============================================

-- Limpar dados de exemplo se existirem
DELETE FROM users WHERE email IN ('admin@escola.com', 'professor@escola.com', 'pai@escola.com');
DELETE FROM people WHERE email IN ('admin@escola.com', 'professor@escola.com', 'pai@escola.com');

-- Inserir dados iniciais atualizados
INSERT INTO people (cpf, name, birth_date, gender, email, phone, address) VALUES
('000.000.001-01', 'Administrador do Sistema', '1980-01-01', 'MALE', 'admin@escola.com', '(11) 99999-9999', 'Secretaria Municipal de Educação'),
('111.111.111-11', 'Professor Silva', '1985-05-15', 'MALE', 'professor@escola.com', '(11) 88888-8888', 'Rua das Escolas, 100'),
('222.222.222-22', 'João dos Santos', '1975-03-20', 'MALE', 'pai@escola.com', '(11) 77777-7777', 'Rua dos Pais, 200')
ON CONFLICT (cpf) DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  address = EXCLUDED.address;

-- ===============================================
-- 5. CRIAR USUÁRIO ADMIN AUTOMATICAMENTE
-- ===============================================

-- Esta parte será executada após criar o usuário no Supabase Auth
-- O usuário admin deve ser criado manualmente no Dashboard do Supabase primeiro

-- Depois de criar admin@escola.com no Auth, execute:
-- INSERT INTO users (id, email, role, person_id, active) 
-- SELECT 
--   auth_user.id,
--   'admin@escola.com',
--   'ADMIN',
--   people.id,
--   true
-- FROM auth.users auth_user, people
-- WHERE auth_user.email = 'admin@escola.com' 
--   AND people.email = 'admin@escola.com'
-- ON CONFLICT (id) DO UPDATE SET
--   role = EXCLUDED.role,
--   person_id = EXCLUDED.person_id,
--   active = EXCLUDED.active;

-- ===============================================
-- 6. FUNÇÃO PARA SETUP DO ADMIN (EXECUTAR DEPOIS)
-- ===============================================

CREATE OR REPLACE FUNCTION public.setup_admin_user(admin_email text)
RETURNS json AS $$
DECLARE
  auth_user_id uuid;
  person_id uuid;
  result json;
BEGIN
  -- Buscar o ID do usuário no auth.users
  SELECT id INTO auth_user_id 
  FROM auth.users 
  WHERE email = admin_email;
  
  IF auth_user_id IS NULL THEN
    RETURN json_build_object('success', false, 'message', 'Usuário não encontrado no auth.users');
  END IF;
  
  -- Buscar o ID da pessoa
  SELECT id INTO person_id 
  FROM people 
  WHERE email = admin_email;
  
  IF person_id IS NULL THEN
    RETURN json_build_object('success', false, 'message', 'Pessoa não encontrada na tabela people');
  END IF;
  
  -- Inserir ou atualizar na tabela users
  INSERT INTO users (id, email, role, person_id, active) 
  VALUES (auth_user_id, admin_email, 'ADMIN', person_id, true)
  ON CONFLICT (id) DO UPDATE SET
    role = EXCLUDED.role,
    person_id = EXCLUDED.person_id,
    active = EXCLUDED.active;
  
  RETURN json_build_object(
    'success', true, 
    'message', 'Admin configurado com sucesso',
    'user_id', auth_user_id,
    'person_id', person_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===============================================
-- 7. VERIFICAÇÕES FINAIS
-- ===============================================

-- Verificar estrutura das tabelas
SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name IN ('users', 'people', 'students', 'teachers', 'schools', 'subjects', 'classes')
ORDER BY table_name, ordinal_position;

-- Verificar políticas RLS
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Verificar dados iniciais
SELECT 'people' as tabela, count(*) as registros FROM people
UNION ALL
SELECT 'schools' as tabela, count(*) as registros FROM schools
UNION ALL
SELECT 'subjects' as tabela, count(*) as registros FROM subjects;

-- ===============================================
-- 8. INSTRUÇÕES FINAIS
-- ===============================================

DO $$
BEGIN
  RAISE NOTICE '✅ DEPLOY SUPABASE CONCLUÍDO!';
  RAISE NOTICE '';
  RAISE NOTICE '📋 PRÓXIMOS PASSOS:';
  RAISE NOTICE '1. Criar usuário admin@escola.com no Authentication > Users';
  RAISE NOTICE '2. Executar: SELECT public.setup_admin_user(''admin@escola.com'');';
  RAISE NOTICE '3. Configurar variáveis no Vercel';
  RAISE NOTICE '4. Testar login na aplicação';
  RAISE NOTICE '';
  RAISE NOTICE '🌐 Sistema pronto para produção!';
END $$;
