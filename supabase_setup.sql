-- Configuração inicial do banco Supabase para Sistema Municipal de Ensino

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tipos enumerados
CREATE TYPE user_role AS ENUM ('ADMIN', 'SECRETARY', 'TEACHER', 'STUDENT', 'PARENT', 'NUTRITIONIST');
CREATE TYPE gender_type AS ENUM ('MALE', 'FEMALE', 'OTHER');
CREATE TYPE school_level AS ENUM ('INFANTIL', 'FUNDAMENTAL_I', 'FUNDAMENTAL_II', 'MEDIO', 'EJA');
CREATE TYPE period_type AS ENUM ('MORNING', 'AFTERNOON', 'EVENING', 'FULL_TIME');
CREATE TYPE attendance_status AS ENUM ('PRESENT', 'ABSENT', 'JUSTIFIED', 'LATE');
CREATE TYPE grade_status AS ENUM ('APPROVED', 'FAILED', 'RECOVERY', 'TRANSFERRED');
CREATE TYPE enrollment_status AS ENUM ('ACTIVE', 'INACTIVE', 'TRANSFERRED', 'COMPLETED', 'CANCELLED');
CREATE TYPE queue_status AS ENUM ('WAITING', 'CALLED', 'ENROLLED', 'CANCELLED', 'EXPIRED');

-- Tabela de pessoas
CREATE TABLE people (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    rg VARCHAR(20),
    name VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    gender gender_type NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(50),
    zip_code VARCHAR(10),
    nationality VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de usuários (estende auth.users do Supabase)
CREATE TABLE users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    person_id UUID REFERENCES people(id),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de estudantes
CREATE TABLE students (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    registration VARCHAR(50) UNIQUE NOT NULL,
    person_id UUID REFERENCES people(id) NOT NULL,
    allergies TEXT,
    medications TEXT,
    observations TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de professores
CREATE TABLE teachers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    registration VARCHAR(50) UNIQUE NOT NULL,
    person_id UUID REFERENCES people(id) NOT NULL,
    specialization TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de pais/responsáveis
CREATE TABLE parents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    person_id UUID REFERENCES people(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de secretários
CREATE TABLE secretaries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    person_id UUID REFERENCES people(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de nutricionistas
CREATE TABLE nutritionists (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    crn VARCHAR(20) UNIQUE NOT NULL,
    person_id UUID REFERENCES people(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de escolas
CREATE TABLE schools (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    director VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de matérias
CREATE TABLE subjects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(10) UNIQUE NOT NULL,
    workload INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de turmas
CREATE TABLE classes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    year INTEGER NOT NULL,
    level school_level NOT NULL,
    period period_type NOT NULL,
    capacity INTEGER NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    school_id UUID REFERENCES schools(id) NOT NULL,
    teacher_id UUID REFERENCES teachers(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Configurações de RLS (Row Level Security)
ALTER TABLE people ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE secretaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE nutritionists ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;

-- Políticas RLS básicas
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_people_updated_at BEFORE UPDATE ON people FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON teachers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_parents_updated_at BEFORE UPDATE ON parents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_secretaries_updated_at BEFORE UPDATE ON secretaries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_nutritionists_updated_at BEFORE UPDATE ON nutritionists FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON schools FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subjects_updated_at BEFORE UPDATE ON subjects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON classes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Dados iniciais de exemplo
INSERT INTO people (cpf, name, birth_date, gender, email) VALUES
('000.000.000-00', 'Administrador do Sistema', '1980-01-01', 'MALE', 'admin@escola.com'),
('111.111.111-11', 'Professor Silva', '1985-05-15', 'MALE', 'professor@escola.com'),
('222.222.222-22', 'João dos Santos', '1975-03-20', 'MALE', 'pai@escola.com');

INSERT INTO schools (code, name, address, phone, email, director) VALUES
('ESC001', 'Escola Municipal Exemplo', 'Rua das Flores, 123 - Centro', '(11) 3333-3333', 'contato@escola.com', 'Diretora Maria');

INSERT INTO subjects (name, code, workload) VALUES
('Matemática', 'MAT', 240),
('Português', 'POR', 240),
('História', 'HIS', 120),
('Geografia', 'GEO', 120);

-- Comentários para documentação
COMMENT ON TABLE people IS 'Tabela principal de pessoas do sistema';
COMMENT ON TABLE users IS 'Tabela de usuários com autenticação Supabase';
COMMENT ON TABLE students IS 'Perfil específico para estudantes';
COMMENT ON TABLE teachers IS 'Perfil específico para professores';
COMMENT ON TABLE parents IS 'Perfil específico para pais/responsáveis';
COMMENT ON TABLE schools IS 'Cadastro de escolas do município';
COMMENT ON TABLE subjects IS 'Matérias/disciplinas do currículo';
COMMENT ON TABLE classes IS 'Turmas organizadas por escola';
