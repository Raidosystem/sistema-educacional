-- Script para criar usuário administrador no sistema
-- Execute este script no SQL Editor do Supabase após criar o usuário na autenticação

-- Primeiro, vamos verificar se o usuário existe na auth.users
-- SELECT * FROM auth.users WHERE email = 'admin@escola.com';

-- Inserir dados na tabela people para o administrador
INSERT INTO people (cpf, name, birth_date, gender, email, phone, address) VALUES
('000.000.001-01', 'Administrador do Sistema', '1980-01-01', 'MALE', 'admin@escola.com', '(11) 99999-9999', 'Secretaria Municipal de Educação')
ON CONFLICT (cpf) DO UPDATE SET
  name = EXCLUDED.name,
  email = EXCLUDED.email,
  phone = EXCLUDED.phone,
  address = EXCLUDED.address;

-- Inserir o usuário na tabela users
-- Substitua 'USER_ID_FROM_AUTH' pelo ID real do usuário criado no Supabase Auth
-- Você pode encontrar este ID em: Authentication > Users no dashboard do Supabase

INSERT INTO users (id, email, role, person_id, active) 
SELECT 
  auth_user.id,
  'admin@escola.com',
  'ADMIN',
  people.id,
  true
FROM auth.users auth_user, people
WHERE auth_user.email = 'admin@escola.com' 
  AND people.email = 'admin@escola.com'
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  person_id = EXCLUDED.person_id,
  active = EXCLUDED.active;

-- Verificar se foi criado corretamente
SELECT 
  u.id,
  u.email,
  u.role,
  p.name,
  u.active
FROM users u
JOIN people p ON u.person_id = p.id
WHERE u.email = 'admin@escola.com';
