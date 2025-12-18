-- Script para criar usuário administrativo de teste
-- Execute no Supabase SQL Editor

-- 1. Primeiro, criar as tabelas básicas se não existirem
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'STUDENT',
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Inserir usuário administrativo (sem hash de senha por enquanto)
INSERT INTO users (email, name, role, active) 
VALUES ('admin@escola.com', 'Administrador do Sistema', 'ADMIN', true)
ON CONFLICT (email) DO UPDATE SET
    name = EXCLUDED.name,
    role = EXCLUDED.role,
    active = EXCLUDED.active,
    updated_at = NOW();

-- 3. Verificar se o usuário foi criado
SELECT * FROM users WHERE email = 'admin@escola.com';

-- IMPORTANTE: 
-- Este usuário precisa ser criado também no Supabase Auth
-- Vá para Authentication > Users no painel do Supabase
-- E crie manualmente o usuário admin@escola.com com senha: admin123
