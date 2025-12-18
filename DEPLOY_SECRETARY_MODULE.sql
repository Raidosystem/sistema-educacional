-- 🚀 DEPLOY COMPLETO - MÓDULO SECRETÁRIO ESCOLAR
-- Execute este script no Supabase para criar toda a estrutura

-- ===============================================
-- 1. CONFIGURAÇÕES INICIAIS
-- ===============================================

-- Verificar e limpar tabelas existentes (se necessário)
-- ATENÇÃO: Descomente as linhas abaixo apenas se quiser APAGAR dados existentes
-- DROP TABLE IF EXISTS academic_records CASCADE;
-- DROP TABLE IF EXISTS attendance CASCADE;
-- DROP TABLE IF EXISTS grades_evaluations CASCADE;
-- DROP TABLE IF EXISTS evaluation_instruments CASCADE;
-- DROP TABLE IF EXISTS academic_periods CASCADE;
-- DROP TABLE IF EXISTS enrollments CASCADE;
-- DROP TABLE IF EXISTS class_assignments CASCADE;
-- DROP TABLE IF EXISTS curriculum_grid CASCADE;
-- DROP TABLE IF EXISTS subjects CASCADE;
-- DROP TABLE IF EXISTS classes CASCADE;
-- DROP TABLE IF EXISTS classrooms CASCADE;
-- DROP TABLE IF EXISTS student_parents CASCADE;
-- DROP TABLE IF EXISTS parents CASCADE;
-- DROP TABLE IF EXISTS teachers CASCADE;
-- DROP TABLE IF EXISTS students CASCADE;
-- DROP TABLE IF EXISTS person_documents CASCADE;
-- DROP TABLE IF EXISTS people CASCADE;
-- DROP TABLE IF EXISTS schools CASCADE;
-- DROP TABLE IF EXISTS grades CASCADE;
-- DROP TABLE IF EXISTS education_levels CASCADE;
-- DROP TABLE IF EXISTS school_years CASCADE;

-- ===============================================
-- 2. TABELAS PRINCIPAIS
-- ===============================================

-- Anos Letivos
CREATE TABLE IF NOT EXISTS school_years (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    year INTEGER NOT NULL UNIQUE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Níveis de Ensino
CREATE TABLE IF NOT EXISTS education_levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    active BOOLEAN DEFAULT true
);

-- Séries/Anos
CREATE TABLE IF NOT EXISTS grades (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    education_level_id UUID REFERENCES education_levels(id),
    code VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    level VARCHAR(20) NOT NULL CHECK (level IN ('INFANTIL', 'FUNDAMENTAL_I', 'FUNDAMENTAL_II', 'MEDIO')),
    order_index INTEGER NOT NULL,
    active BOOLEAN DEFAULT true
);

-- Escolas
CREATE TABLE IF NOT EXISTS schools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    address TEXT NOT NULL,
    neighborhood VARCHAR(100),
    city VARCHAR(100) DEFAULT 'Sua Cidade',
    state VARCHAR(2) DEFAULT 'SP',
    zipcode VARCHAR(10),
    phone VARCHAR(20),
    email VARCHAR(100),
    director_id UUID,
    vice_director_id UUID,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pessoas (tabela principal para todos os tipos)
CREATE TABLE IF NOT EXISTS people (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cpf VARCHAR(14) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    birth_date DATE NOT NULL,
    gender CHAR(1) NOT NULL CHECK (gender IN ('M', 'F')),
    email VARCHAR(100),
    phone VARCHAR(20),
    mobile VARCHAR(20),
    address TEXT,
    neighborhood VARCHAR(100),
    city VARCHAR(100),
    state VARCHAR(2),
    zipcode VARCHAR(10),
    nationality VARCHAR(50) DEFAULT 'Brasileira',
    marital_status VARCHAR(20),
    profession VARCHAR(100),
    education_level VARCHAR(50),
    photo_url TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documentos das Pessoas
CREATE TABLE IF NOT EXISTS person_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person_id UUID REFERENCES people(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL, -- RG, CNH, TITULO_ELEITOR, etc
    document_number VARCHAR(50) NOT NULL,
    issuing_agency VARCHAR(50),
    issue_date DATE,
    expiry_date DATE,
    file_name VARCHAR(255),
    file_url TEXT,
    verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Alunos
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person_id UUID REFERENCES people(id) ON DELETE CASCADE,
    registration VARCHAR(20) NOT NULL UNIQUE,
    nis VARCHAR(20), -- Número de Identificação Social
    allergies TEXT,
    medications TEXT,
    observations TEXT,
    special_needs TEXT,
    transportation_type VARCHAR(50), -- PROPRIO, PUBLICO, ESCOLAR
    emergency_contact_name VARCHAR(200),
    emergency_contact_phone VARCHAR(20),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Professores
CREATE TABLE IF NOT EXISTS teachers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person_id UUID REFERENCES people(id) ON DELETE CASCADE,
    registration VARCHAR(20) NOT NULL UNIQUE,
    specialization TEXT,
    formation TEXT,
    experience_years INTEGER DEFAULT 0,
    hire_date DATE,
    employment_type VARCHAR(50), -- EFETIVO, TEMPORARIO, TERCEIRIZADO
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Pais/Responsáveis
CREATE TABLE IF NOT EXISTS parents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person_id UUID REFERENCES people(id) ON DELETE CASCADE,
    relationship VARCHAR(50) NOT NULL, -- PAI, MAE, RESPONSAVEL, AVOS, etc
    is_primary_contact BOOLEAN DEFAULT false,
    is_emergency_contact BOOLEAN DEFAULT false,
    can_pick_up_student BOOLEAN DEFAULT true,
    observations TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Relacionamento Aluno-Responsável
CREATE TABLE IF NOT EXISTS student_parents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES parents(id) ON DELETE CASCADE,
    relationship VARCHAR(50) NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id, parent_id)
);

-- Salas de Aula
CREATE TABLE IF NOT EXISTS classrooms (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    code VARCHAR(20) NOT NULL,
    name VARCHAR(100) NOT NULL,
    capacity INTEGER NOT NULL DEFAULT 30,
    type VARCHAR(50), -- REGULAR, INFORMATICA, LABORATORIO, etc
    resources TEXT, -- JSON com recursos disponíveis
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Turmas
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

-- Matérias/Disciplinas
CREATE TABLE IF NOT EXISTS subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    workload_per_year INTEGER NOT NULL, -- Carga horária anual
    education_level_id UUID REFERENCES education_levels(id),
    is_mandatory BOOLEAN DEFAULT true,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Grade Curricular (Matérias por Série)
CREATE TABLE IF NOT EXISTS curriculum_grid (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    grade_id UUID REFERENCES grades(id),
    subject_id UUID REFERENCES subjects(id),
    workload INTEGER NOT NULL, -- Carga horária específica para esta série
    weekly_classes INTEGER NOT NULL,
    is_mandatory BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(grade_id, subject_id)
);

-- Atribuição de Professores a Turmas/Matérias
CREATE TABLE IF NOT EXISTS class_assignments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id),
    teacher_id UUID REFERENCES teachers(id),
    school_year_id UUID REFERENCES school_years(id),
    start_date DATE,
    end_date DATE,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Matrículas
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

-- Períodos Acadêmicos (Bimestres, Trimestres, etc)
CREATE TABLE IF NOT EXISTS academic_periods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    school_year_id UUID REFERENCES school_years(id),
    name VARCHAR(50) NOT NULL, -- 1º Bimestre, 2º Bimestre, etc
    order_index INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Instrumentos de Avaliação
CREATE TABLE IF NOT EXISTS evaluation_instruments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL, -- Prova, Trabalho, Seminário, etc
    code VARCHAR(20) NOT NULL,
    weight DECIMAL(3,2) DEFAULT 1.0, -- Peso da avaliação
    description TEXT,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notas e Avaliações
CREATE TABLE IF NOT EXISTS grades_evaluations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enrollment_id UUID REFERENCES enrollments(id) ON DELETE CASCADE,
    subject_id UUID REFERENCES subjects(id),
    academic_period_id UUID REFERENCES academic_periods(id),
    evaluation_instrument_id UUID REFERENCES evaluation_instruments(id),
    numeric_grade DECIMAL(4,2), -- Para notas numéricas (0-10)
    concept_grade VARCHAR(2), -- Para conceitos (A, B, C, D, E)
    descriptive_evaluation TEXT, -- Avaliação descritiva
    evaluation_date DATE NOT NULL,
    teacher_id UUID REFERENCES teachers(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Frequência/Presença
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

-- Histórico Escolar
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
-- 3. ÍNDICES PARA PERFORMANCE
-- ===============================================

-- Índices principais (apenas se não existirem)
CREATE INDEX IF NOT EXISTS idx_people_cpf ON people(cpf);
CREATE INDEX IF NOT EXISTS idx_people_name ON people(name);
CREATE INDEX IF NOT EXISTS idx_people_active ON people(active);

CREATE INDEX IF NOT EXISTS idx_students_registration ON students(registration);
CREATE INDEX IF NOT EXISTS idx_students_active ON students(active);

CREATE INDEX IF NOT EXISTS idx_enrollments_student ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_class ON enrollments(class_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON enrollments(status);
CREATE INDEX IF NOT EXISTS idx_enrollments_year ON enrollments(school_year_id);

CREATE INDEX IF NOT EXISTS idx_attendance_enrollment ON attendance(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(class_date);
CREATE INDEX IF NOT EXISTS idx_attendance_status ON attendance(status);

CREATE INDEX IF NOT EXISTS idx_grades_enrollment ON grades_evaluations(enrollment_id);
CREATE INDEX IF NOT EXISTS idx_grades_subject ON grades_evaluations(subject_id);
CREATE INDEX IF NOT EXISTS idx_grades_period ON grades_evaluations(academic_period_id);

-- ===============================================
-- 4. TRIGGERS E FUNÇÕES
-- ===============================================

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at (apenas se não existirem)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_people_updated_at') THEN
        CREATE TRIGGER update_people_updated_at BEFORE UPDATE ON people 
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_students_updated_at') THEN
        CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students 
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_teachers_updated_at') THEN
        CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON teachers 
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_classes_updated_at') THEN
        CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON classes 
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_enrollments_updated_at') THEN
        CREATE TRIGGER update_enrollments_updated_at BEFORE UPDATE ON enrollments 
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Função para atualizar contador de matrículas na turma
CREATE OR REPLACE FUNCTION update_class_enrollment_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE classes 
        SET current_enrollment = (
            SELECT COUNT(*) FROM enrollments 
            WHERE class_id = NEW.class_id AND status = 'ACTIVE'
        )
        WHERE id = NEW.class_id;
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        UPDATE classes 
        SET current_enrollment = (
            SELECT COUNT(*) FROM enrollments 
            WHERE class_id = NEW.class_id AND status = 'ACTIVE'
        )
        WHERE id = NEW.class_id;
        
        IF OLD.class_id != NEW.class_id THEN
            UPDATE classes 
            SET current_enrollment = (
                SELECT COUNT(*) FROM enrollments 
                WHERE class_id = OLD.class_id AND status = 'ACTIVE'
            )
            WHERE id = OLD.class_id;
        END IF;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE classes 
        SET current_enrollment = (
            SELECT COUNT(*) FROM enrollments 
            WHERE class_id = OLD.class_id AND status = 'ACTIVE'
        )
        WHERE id = OLD.class_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_update_class_enrollment_count') THEN
        CREATE TRIGGER trigger_update_class_enrollment_count
            AFTER INSERT OR UPDATE OR DELETE ON enrollments
            FOR EACH ROW EXECUTE FUNCTION update_class_enrollment_count();
    END IF;
END $$;

-- ===============================================
-- 5. VIEWS PARA RELATÓRIOS
-- ===============================================

-- View para resumo de frequência (apenas se não existir)
DROP VIEW IF EXISTS vw_attendance_summary;
CREATE VIEW vw_attendance_summary AS
SELECT 
    e.id as enrollment_id,
    s.id as student_id,
    p.name as student_name,
    c.id as class_id,
    c.name as class_name,
    sub.id as subject_id,
    sub.name as subject_name,
    COUNT(*) as total_classes,
    COUNT(CASE WHEN a.status = 'PRESENT' THEN 1 END) as present_count,
    COUNT(CASE WHEN a.status = 'ABSENT' THEN 1 END) as absent_count,
    COUNT(CASE WHEN a.status = 'LATE' THEN 1 END) as late_count,
    COUNT(CASE WHEN a.status = 'JUSTIFIED' THEN 1 END) as justified_count,
    ROUND(
        (COUNT(CASE WHEN a.status IN ('PRESENT', 'LATE') THEN 1 END) * 100.0) / COUNT(*), 
        2
    ) as frequency_percentage
FROM enrollments e
    JOIN students s ON e.student_id = s.id
    JOIN people p ON s.person_id = p.id
    JOIN classes c ON e.class_id = c.id
    LEFT JOIN attendance a ON e.id = a.enrollment_id
    LEFT JOIN subjects sub ON a.subject_id = sub.id
WHERE e.status = 'ACTIVE'
GROUP BY e.id, s.id, p.name, c.id, c.name, sub.id, sub.name;

-- View para boletim de notas (apenas se não existir)
DROP VIEW IF EXISTS vw_grades_by_period;
CREATE VIEW vw_grades_by_period AS
SELECT 
    e.id as enrollment_id,
    s.id as student_id,
    p.name as student_name,
    c.name as class_name,
    g.name as grade_name,
    sub.name as subject_name,
    ap.name as period_name,
    ap.order_index as period_order,
    ge.numeric_grade,
    ge.concept_grade,
    ge.descriptive_evaluation,
    ei.name as evaluation_type,
    ge.evaluation_date
FROM enrollments e
    JOIN students s ON e.student_id = s.id
    JOIN people p ON s.person_id = p.id
    JOIN classes c ON e.class_id = c.id
    JOIN grades g ON c.grade_id = g.id
    LEFT JOIN grades_evaluations ge ON e.id = ge.enrollment_id
    LEFT JOIN subjects sub ON ge.subject_id = sub.id
    LEFT JOIN academic_periods ap ON ge.academic_period_id = ap.id
    LEFT JOIN evaluation_instruments ei ON ge.evaluation_instrument_id = ei.id
WHERE e.status = 'ACTIVE'
ORDER BY p.name, sub.name, ap.order_index;

-- ===============================================
-- 6. DADOS INICIAIS
-- ===============================================

-- Anos Letivos (inserir apenas se não existir)
INSERT INTO school_years (year, start_date, end_date, active) 
SELECT 2024, '2024-02-01', '2024-12-20', true
WHERE NOT EXISTS (SELECT 1 FROM school_years WHERE year = 2024);

INSERT INTO school_years (year, start_date, end_date, active) 
SELECT 2025, '2025-02-01', '2025-12-20', false
WHERE NOT EXISTS (SELECT 1 FROM school_years WHERE year = 2025);

-- Níveis de Ensino (inserir apenas se não existir)
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
INSERT INTO grades (education_level_id, code, name, level, order_index) VALUES 
((SELECT id FROM education_levels WHERE code = 'EI'), 'PRE1', 'Pré I', 'INFANTIL', 1),
((SELECT id FROM education_levels WHERE code = 'EI'), 'PRE2', 'Pré II', 'INFANTIL', 2),
((SELECT id FROM education_levels WHERE code = 'EF1'), '1ANO', '1º Ano', 'FUNDAMENTAL_I', 3),
((SELECT id FROM education_levels WHERE code = 'EF1'), '2ANO', '2º Ano', 'FUNDAMENTAL_I', 4),
((SELECT id FROM education_levels WHERE code = 'EF1'), '3ANO', '3º Ano', 'FUNDAMENTAL_I', 5),
((SELECT id FROM education_levels WHERE code = 'EF1'), '4ANO', '4º Ano', 'FUNDAMENTAL_I', 6),
((SELECT id FROM education_levels WHERE code = 'EF1'), '5ANO', '5º Ano', 'FUNDAMENTAL_I', 7),
((SELECT id FROM education_levels WHERE code = 'EF2'), '6ANO', '6º Ano', 'FUNDAMENTAL_II', 8),
((SELECT id FROM education_levels WHERE code = 'EF2'), '7ANO', '7º Ano', 'FUNDAMENTAL_II', 9),
((SELECT id FROM education_levels WHERE code = 'EF2'), '8ANO', '8º Ano', 'FUNDAMENTAL_II', 10),
((SELECT id FROM education_levels WHERE code = 'EF2'), '9ANO', '9º Ano', 'FUNDAMENTAL_II', 11);

-- Matérias/Disciplinas
INSERT INTO subjects (code, name, workload_per_year, education_level_id) VALUES 
('PORT', 'Língua Portuguesa', 200, (SELECT id FROM education_levels WHERE code = 'EF1')),
('MAT', 'Matemática', 200, (SELECT id FROM education_levels WHERE code = 'EF1')),
('HIST', 'História', 100, (SELECT id FROM education_levels WHERE code = 'EF1')),
('GEO', 'Geografia', 100, (SELECT id FROM education_levels WHERE code = 'EF1')),
('CIEN', 'Ciências', 100, (SELECT id FROM education_levels WHERE code = 'EF1')),
('EDF', 'Educação Física', 100, (SELECT id FROM education_levels WHERE code = 'EF1')),
('ARTE', 'Arte', 100, (SELECT id FROM education_levels WHERE code = 'EF1'));

-- Períodos Acadêmicos para 2024
INSERT INTO academic_periods (school_year_id, name, order_index, start_date, end_date) VALUES 
((SELECT id FROM school_years WHERE year = 2024), '1º Bimestre', 1, '2024-02-01', '2024-04-30'),
((SELECT id FROM school_years WHERE year = 2024), '2º Bimestre', 2, '2024-05-01', '2024-07-31'),
((SELECT id FROM school_years WHERE year = 2024), '3º Bimestre', 3, '2024-08-01', '2024-10-31'),
((SELECT id FROM school_years WHERE year = 2024), '4º Bimestre', 4, '2024-11-01', '2024-12-20');

-- Instrumentos de Avaliação
INSERT INTO evaluation_instruments (name, code, weight, description) VALUES 
('Prova', 'PROVA', 1.0, 'Avaliação escrita formal'),
('Trabalho', 'TRABALHO', 0.8, 'Trabalho individual ou em grupo'),
('Seminário', 'SEMINARIO', 0.7, 'Apresentação oral'),
('Participação', 'PARTICIPACAO', 0.5, 'Participação em aula');

-- Escola exemplo
INSERT INTO schools (code, name, address, phone, email) VALUES 
('ESC001', 'Escola Municipal Exemplo', 'Rua das Flores, 123 - Centro', '(11) 3456-7890', 'escola@exemplo.com');

-- ===============================================
-- 7. CONFIGURAÇÕES DE SEGURANÇA (RLS)
-- ===============================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE people ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades_evaluations ENABLE ROW LEVEL SECURITY;

-- Políticas RLS básicas (permissivas para desenvolvimento)
CREATE POLICY "Allow all for authenticated users" ON people FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated users" ON students FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated users" ON teachers FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated users" ON parents FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated users" ON schools FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated users" ON classes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated users" ON enrollments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated users" ON attendance FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all for authenticated users" ON grades_evaluations FOR ALL USING (auth.role() = 'authenticated');

-- ===============================================
-- 8. DADOS DE TESTE
-- ===============================================

-- Pessoas de exemplo
INSERT INTO people (cpf, name, birth_date, gender, email, phone) VALUES 
('12345678901', 'João Silva Santos', '1980-05-15', 'M', 'joao@email.com', '(11) 99999-1111'),
('98765432100', 'Maria Oliveira Costa', '1975-08-20', 'F', 'maria@email.com', '(11) 99999-2222'),
('11122233344', 'Pedro Almeida', '2015-03-10', 'M', null, null),
('55566677788', 'Ana Beatriz Silva', '2014-11-25', 'F', null, null);

-- Professores
INSERT INTO teachers (person_id, registration, specialization, formation) VALUES 
((SELECT id FROM people WHERE cpf = '12345678901'), 'PROF001', 'Pedagogia', 'Licenciatura em Pedagogia'),
((SELECT id FROM people WHERE cpf = '98765432100'), 'PROF002', 'Matemática', 'Licenciatura em Matemática');

-- Estudantes
INSERT INTO students (person_id, registration) VALUES 
((SELECT id FROM people WHERE cpf = '11122233344'), 'EST001'),
((SELECT id FROM people WHERE cpf = '55566677788'), 'EST002');

-- Salas de aula
INSERT INTO classrooms (school_id, code, name, capacity) VALUES 
((SELECT id FROM schools WHERE code = 'ESC001'), 'SALA01', 'Sala 01', 30),
((SELECT id FROM schools WHERE code = 'ESC001'), 'SALA02', 'Sala 02', 25);

-- Turmas
INSERT INTO classes (school_id, grade_id, school_year_id, classroom_id, code, name, period, capacity) VALUES 
(
    (SELECT id FROM schools WHERE code = 'ESC001'),
    (SELECT id FROM grades WHERE code = '1ANO'),
    (SELECT id FROM school_years WHERE year = 2024),
    (SELECT id FROM classrooms WHERE code = 'SALA01'),
    '1A-2024', '1º Ano A', 'MATUTINO', 30
),
(
    (SELECT id FROM schools WHERE code = 'ESC001'),
    (SELECT id FROM grades WHERE code = '2ANO'),
    (SELECT id FROM school_years WHERE year = 2024),
    (SELECT id FROM classrooms WHERE code = 'SALA02'),
    '2A-2024', '2º Ano A', 'MATUTINO', 25
);

-- Matrículas
INSERT INTO enrollments (student_id, class_id, school_year_id, registration_number) VALUES 
(
    (SELECT id FROM students WHERE registration = 'EST001'),
    (SELECT id FROM classes WHERE code = '1A-2024'),
    (SELECT id FROM school_years WHERE year = 2024),
    '2024000001'
),
(
    (SELECT id FROM students WHERE registration = 'EST002'),
    (SELECT id FROM classes WHERE code = '2A-2024'),
    (SELECT id FROM school_years WHERE year = 2024),
    '2024000002'
);

-- ===============================================
-- 9. FINALIZAÇÃO
-- ===============================================

-- Atualizar foreign keys para escolas (diretores)
UPDATE schools SET 
    director_id = (SELECT id FROM teachers WHERE registration = 'PROF001'),
    vice_director_id = (SELECT id FROM teachers WHERE registration = 'PROF002')
WHERE code = 'ESC001';

-- Atualizar professor titular das turmas
UPDATE classes SET 
    homeroom_teacher_id = (SELECT id FROM teachers WHERE registration = 'PROF001')
WHERE code = '1A-2024';

UPDATE classes SET 
    homeroom_teacher_id = (SELECT id FROM teachers WHERE registration = 'PROF002')
WHERE code = '2A-2024';

-- Criar usuário administrador
INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    role
) VALUES (
    gen_random_uuid(),
    'admin@escola.com',
    crypt('123456', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW(),
    '{"provider": "email", "providers": ["email"]}',
    '{"role": "ADMIN", "name": "Administrador"}',
    false,
    'authenticated'
) ON CONFLICT (email) DO UPDATE SET
    encrypted_password = EXCLUDED.encrypted_password,
    raw_user_meta_data = EXCLUDED.raw_user_meta_data;

-- Comentário final
COMMENT ON SCHEMA public IS 'Schema principal do Sistema de Gestão Educacional - Módulo Secretário Escolar';

-- Sucesso!
SELECT 'Deploy do Módulo Secretário Escolar concluído com sucesso!' as status;
SELECT COUNT(*) || ' pessoas cadastradas' as people_count FROM people;
SELECT COUNT(*) || ' alunos cadastrados' as students_count FROM students;
SELECT COUNT(*) || ' turmas criadas' as classes_count FROM classes;
SELECT COUNT(*) || ' matrículas ativas' as enrollments_count FROM enrollments WHERE status = 'ACTIVE';
