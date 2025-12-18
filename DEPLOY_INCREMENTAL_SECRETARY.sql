-- 🚀 DEPLOY INCREMENTAL - MÓDULO SECRETÁRIO ESCOLAR
-- Execute este script para adicionar apenas as tabelas que faltam

-- ===============================================
-- VERIFICAR TABELAS EXISTENTES
-- ===============================================

-- Verificar quais tabelas já existem
SELECT 
    'schools' as tabela,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'schools') 
         THEN '✅ Existe' 
         ELSE '❌ Não existe' 
    END as status
UNION ALL
SELECT 
    'people' as tabela,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'people') 
         THEN '✅ Existe' 
         ELSE '❌ Não existe' 
    END as status
UNION ALL
SELECT 
    'students' as tabela,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'students') 
         THEN '✅ Existe' 
         ELSE '❌ Não existe' 
    END as status;

-- ===============================================
-- CRIAR APENAS TABELAS NOVAS DO MÓDULO SECRETÁRIO
-- ===============================================

-- Anos Letivos (nova)
CREATE TABLE IF NOT EXISTS school_years (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    year INTEGER NOT NULL UNIQUE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Níveis de Ensino (nova)
CREATE TABLE IF NOT EXISTS education_levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    active BOOLEAN DEFAULT true
);

-- Séries/Anos (nova)
CREATE TABLE IF NOT EXISTS grades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    education_level_id UUID REFERENCES education_levels(id),
    code VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    level VARCHAR(20) NOT NULL CHECK (level IN ('INFANTIL', 'FUNDAMENTAL_I', 'FUNDAMENTAL_II', 'MEDIO')),
    order_index INTEGER NOT NULL,
    active BOOLEAN DEFAULT true
);

-- Documentos das Pessoas (nova)
CREATE TABLE IF NOT EXISTS person_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person_id UUID REFERENCES people(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL,
    document_number VARCHAR(50) NOT NULL,
    issuing_agency VARCHAR(50),
    issue_date DATE,
    expiry_date DATE,
    file_name VARCHAR(255),
    file_url TEXT,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pais/Responsáveis (nova)
CREATE TABLE IF NOT EXISTS parents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person_id UUID REFERENCES people(id) ON DELETE CASCADE,
    relationship VARCHAR(50) NOT NULL,
    is_primary_contact BOOLEAN DEFAULT false,
    is_emergency_contact BOOLEAN DEFAULT false,
    can_pick_up_student BOOLEAN DEFAULT true,
    observations TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Relacionamento Aluno-Responsável (nova)
CREATE TABLE IF NOT EXISTS student_parents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES parents(id) ON DELETE CASCADE,
    relationship VARCHAR(50) NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id, parent_id)
);

-- Salas de Aula (nova)
CREATE TABLE IF NOT EXISTS classrooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    code VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    capacity INTEGER NOT NULL DEFAULT 30,
    type VARCHAR(50),
    resources TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Turmas (nova)
CREATE TABLE IF NOT EXISTS classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    grade_id UUID REFERENCES grades(id),
    school_year_id UUID REFERENCES school_years(id),
    classroom_id UUID REFERENCES classrooms(id),
    code VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    period VARCHAR(20) NOT NULL CHECK (period IN ('MATUTINO', 'VESPERTINO', 'NOTURNO', 'INTEGRAL')),
    capacity INTEGER NOT NULL DEFAULT 30,
    current_enrollment INTEGER DEFAULT 0,
    homeroom_teacher_id UUID REFERENCES teachers(id),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(school_id, code, school_year_id)
);

-- Matérias/Disciplinas (nova)
CREATE TABLE IF NOT EXISTS subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Matrículas (nova)
CREATE TABLE IF NOT EXISTS enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    class_id UUID REFERENCES classes(id),
    school_year_id UUID REFERENCES school_years(id),
    registration_number VARCHAR(50) NOT NULL UNIQUE,
    enrollment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' 
        CHECK (status IN ('ACTIVE', 'INACTIVE', 'TRANSFERRED', 'GRADUATED', 'DROPPED_OUT')),
    transfer_reason TEXT,
    transfer_date DATE,
    observations TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Períodos Acadêmicos (nova)
CREATE TABLE IF NOT EXISTS academic_periods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_year_id UUID REFERENCES school_years(id),
    name VARCHAR(50) NOT NULL,
    order_index INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Instrumentos de Avaliação (nova)
CREATE TABLE IF NOT EXISTS evaluation_instruments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) NOT NULL,
    weight DECIMAL(3,2) DEFAULT 1.0,
    description TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notas e Avaliações (nova)
CREATE TABLE IF NOT EXISTS grades_evaluations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id),
    academic_period_id UUID REFERENCES academic_periods(id),
    evaluation_instrument_id UUID REFERENCES evaluation_instruments(id),
    numeric_grade DECIMAL(4,2),
    concept_grade VARCHAR(2),
    descriptive_evaluation TEXT,
    evaluation_date DATE NOT NULL,
    teacher_id UUID REFERENCES teachers(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Frequência/Presença (nova)
CREATE TABLE IF NOT EXISTS attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id),
    class_date DATE NOT NULL,
    class_time TIME NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PRESENT' 
        CHECK (status IN ('PRESENT', 'ABSENT', 'LATE', 'JUSTIFIED')),
    justification TEXT,
    recorded_by UUID REFERENCES teachers(id),
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(enrollment_id, subject_id, class_date, class_time)
);

-- Histórico Escolar (nova)
CREATE TABLE IF NOT EXISTS academic_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    school_year_id UUID REFERENCES school_years(id),
    grade_id UUID REFERENCES grades(id),
    school_id UUID REFERENCES schools(id),
    final_result VARCHAR(20) NOT NULL CHECK (final_result IN ('APPROVED', 'FAILED', 'IN_PROGRESS')),
    total_absences INTEGER DEFAULT 0,
    frequency_percentage DECIMAL(5,2),
    observations TEXT,
    generated_by UUID,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===============================================
-- ADICIONAR COLUNAS ÀS TABELAS EXISTENTES
-- ===============================================

-- Adicionar colunas em PEOPLE (se não existirem)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'people' AND column_name = 'mobile') THEN
        ALTER TABLE people ADD COLUMN mobile VARCHAR(20);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'people' AND column_name = 'neighborhood') THEN
        ALTER TABLE people ADD COLUMN neighborhood VARCHAR(100);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'people' AND column_name = 'city') THEN
        ALTER TABLE people ADD COLUMN city VARCHAR(100);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'people' AND column_name = 'state') THEN
        ALTER TABLE people ADD COLUMN state VARCHAR(2);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'people' AND column_name = 'zipcode') THEN
        ALTER TABLE people ADD COLUMN zipcode VARCHAR(10);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'people' AND column_name = 'nationality') THEN
        ALTER TABLE people ADD COLUMN nationality VARCHAR(50) DEFAULT 'Brasileira';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'people' AND column_name = 'marital_status') THEN
        ALTER TABLE people ADD COLUMN marital_status VARCHAR(20);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'people' AND column_name = 'profession') THEN
        ALTER TABLE people ADD COLUMN profession VARCHAR(100);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'people' AND column_name = 'education_level') THEN
        ALTER TABLE people ADD COLUMN education_level VARCHAR(50);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'people' AND column_name = 'photo_url') THEN
        ALTER TABLE people ADD COLUMN photo_url TEXT;
    END IF;
END $$;

-- Adicionar colunas em STUDENTS (se não existirem)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'nis') THEN
        ALTER TABLE students ADD COLUMN nis VARCHAR(20);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'allergies') THEN
        ALTER TABLE students ADD COLUMN allergies TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'medications') THEN
        ALTER TABLE students ADD COLUMN medications TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'observations') THEN
        ALTER TABLE students ADD COLUMN observations TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'special_needs') THEN
        ALTER TABLE students ADD COLUMN special_needs TEXT;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'transportation_type') THEN
        ALTER TABLE students ADD COLUMN transportation_type VARCHAR(50);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'emergency_contact_name') THEN
        ALTER TABLE students ADD COLUMN emergency_contact_name VARCHAR(200);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'students' AND column_name = 'emergency_contact_phone') THEN
        ALTER TABLE students ADD COLUMN emergency_contact_phone VARCHAR(20);
    END IF;
END $$;

-- Adicionar colunas em SCHOOLS (se não existirem)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'schools' AND column_name = 'neighborhood') THEN
        ALTER TABLE schools ADD COLUMN neighborhood VARCHAR(100);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'schools' AND column_name = 'city') THEN
        ALTER TABLE schools ADD COLUMN city VARCHAR(100) DEFAULT 'Sua Cidade';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'schools' AND column_name = 'state') THEN
        ALTER TABLE schools ADD COLUMN state VARCHAR(2) DEFAULT 'SP';
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'schools' AND column_name = 'zipcode') THEN
        ALTER TABLE schools ADD COLUMN zipcode VARCHAR(10);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'schools' AND column_name = 'director_id') THEN
        ALTER TABLE schools ADD COLUMN director_id UUID;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'schools' AND column_name = 'vice_director_id') THEN
        ALTER TABLE schools ADD COLUMN vice_director_id UUID;
    END IF;
END $$;

-- Adicionar colunas em SUBJECTS (se não existirem)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'subjects' AND column_name = 'workload_per_year') THEN
        ALTER TABLE subjects ADD COLUMN workload_per_year INTEGER;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'subjects' AND column_name = 'education_level_id') THEN
        ALTER TABLE subjects ADD COLUMN education_level_id UUID REFERENCES education_levels(id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'subjects' AND column_name = 'is_mandatory') THEN
        ALTER TABLE subjects ADD COLUMN is_mandatory BOOLEAN DEFAULT true;
    END IF;
END $$;

-- ===============================================
-- DADOS INICIAIS ESSENCIAIS
-- ===============================================

-- Anos Letivos
INSERT INTO school_years (year, start_date, end_date, active) 
SELECT 2024, '2024-02-01', '2024-12-20', true
WHERE NOT EXISTS (SELECT 1 FROM school_years WHERE year = 2024);

INSERT INTO school_years (year, start_date, end_date, active) 
SELECT 2025, '2025-02-01', '2025-12-20', false
WHERE NOT EXISTS (SELECT 1 FROM school_years WHERE year = 2025);

-- Níveis de Ensino
INSERT INTO education_levels (code, name, description) 
SELECT 'EI', 'Educação Infantil', 'Pré-escola para crianças de 4 a 5 anos'
WHERE NOT EXISTS (SELECT 1 FROM education_levels WHERE code = 'EI');

INSERT INTO education_levels (code, name, description) 
SELECT 'EF1', 'Ensino Fundamental I', '1º ao 5º ano'
WHERE NOT EXISTS (SELECT 1 FROM education_levels WHERE code = 'EF1');

INSERT INTO education_levels (code, name, description) 
SELECT 'EF2', 'Ensino Fundamental II', '6º ao 9º ano'
WHERE NOT EXISTS (SELECT 1 FROM education_levels WHERE code = 'EF2');

INSERT INTO education_levels (code, name, description) 
SELECT 'EM', 'Ensino Médio', '1º ao 3º ano do Ensino Médio'
WHERE NOT EXISTS (SELECT 1 FROM education_levels WHERE code = 'EM');

-- Séries/Anos
INSERT INTO grades (education_level_id, code, name, level, order_index) 
SELECT 
    (SELECT id FROM education_levels WHERE code = 'EF1'), 
    '1ANO', '1º Ano', 'FUNDAMENTAL_I', 3
WHERE NOT EXISTS (SELECT 1 FROM grades WHERE code = '1ANO');

INSERT INTO grades (education_level_id, code, name, level, order_index) 
SELECT 
    (SELECT id FROM education_levels WHERE code = 'EF1'), 
    '2ANO', '2º Ano', 'FUNDAMENTAL_I', 4
WHERE NOT EXISTS (SELECT 1 FROM grades WHERE code = '2ANO');

-- Matérias básicas (inserir após adicionar colunas)
DO $$
DECLARE
    has_workload_col boolean;
BEGIN
    -- Verificar se existe coluna 'workload' obrigatória
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'subjects' 
        AND column_name = 'workload'
        AND is_nullable = 'NO'
    ) INTO has_workload_col;
    
    -- Inserir Língua Portuguesa
    IF NOT EXISTS (SELECT 1 FROM subjects WHERE code = 'PORT') THEN
        IF has_workload_col THEN
            -- Tabela tem workload obrigatório
            INSERT INTO subjects (code, name, workload, workload_per_year, education_level_id, is_mandatory)
            VALUES (
                'PORT', 
                'Língua Portuguesa', 
                200,  -- workload (campo obrigatório existente)
                200,  -- workload_per_year (campo novo)
                (SELECT id FROM education_levels WHERE code = 'EF1'),
                true
            );
        ELSE
            -- Tabela não tem workload obrigatório
            INSERT INTO subjects (code, name, workload_per_year, education_level_id, is_mandatory)
            VALUES (
                'PORT', 
                'Língua Portuguesa', 
                200,
                (SELECT id FROM education_levels WHERE code = 'EF1'),
                true
            );
        END IF;
    END IF;
    
    -- Inserir Matemática  
    IF NOT EXISTS (SELECT 1 FROM subjects WHERE code = 'MAT') THEN
        IF has_workload_col THEN
            -- Tabela tem workload obrigatório
            INSERT INTO subjects (code, name, workload, workload_per_year, education_level_id, is_mandatory)
            VALUES (
                'MAT', 
                'Matemática', 
                200,  -- workload (campo obrigatório existente)
                200,  -- workload_per_year (campo novo)
                (SELECT id FROM education_levels WHERE code = 'EF1'),
                true
            );
        ELSE
            -- Tabela não tem workload obrigatório
            INSERT INTO subjects (code, name, workload_per_year, education_level_id, is_mandatory)
            VALUES (
                'MAT', 
                'Matemática', 
                200,
                (SELECT id FROM education_levels WHERE code = 'EF1'),
                true
            );
        END IF;
    END IF;
END $$;

-- Períodos Acadêmicos para 2024
INSERT INTO academic_periods (school_year_id, name, order_index, start_date, end_date) 
SELECT 
    (SELECT id FROM school_years WHERE year = 2024), 
    '1º Bimestre', 1, '2024-02-01', '2024-04-30'
WHERE NOT EXISTS (
    SELECT 1 FROM academic_periods 
    WHERE name = '1º Bimestre' 
    AND school_year_id = (SELECT id FROM school_years WHERE year = 2024)
);

-- Instrumentos de Avaliação
INSERT INTO evaluation_instruments (name, code, weight, description) 
SELECT 'Prova', 'PROVA', 1.0, 'Avaliação escrita formal'
WHERE NOT EXISTS (SELECT 1 FROM evaluation_instruments WHERE code = 'PROVA');

-- ===============================================
-- CONFERÊNCIA FINAL
-- ===============================================

-- Verificar o que foi criado
SELECT 
    'Módulo Secretário Escolar - Deploy Incremental Concluído!' as status,
    (SELECT COUNT(*) FROM information_schema.tables WHERE table_name IN (
        'school_years', 'education_levels', 'grades', 'person_documents', 
        'parents', 'student_parents', 'classrooms', 'classes', 'subjects',
        'enrollments', 'academic_periods', 'evaluation_instruments',
        'grades_evaluations', 'attendance', 'academic_records'
    )) as novas_tabelas_criadas,
    (SELECT COUNT(*) FROM school_years) as anos_letivos,
    (SELECT COUNT(*) FROM education_levels) as niveis_ensino,
    (SELECT COUNT(*) FROM grades) as series_anos,
    (SELECT COUNT(*) FROM subjects) as materias;
