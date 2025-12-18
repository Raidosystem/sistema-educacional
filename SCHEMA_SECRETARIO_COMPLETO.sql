-- 📚 SCHEMA COMPLETO - MÓDULO SECRETÁRIO ESCOLAR
-- Estrutura de banco de dados para todas as funcionalidades

-- ===============================================
-- 1. EXTENSÕES E TIPOS ENUMERADOS
-- ===============================================

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- Tipos enumerados expandidos
CREATE TYPE user_role AS ENUM ('ADMIN', 'SECRETARY', 'TEACHER', 'STUDENT', 'PARENT', 'NUTRITIONIST', 'COORDINATOR', 'DIRECTOR');
CREATE TYPE gender_type AS ENUM ('MALE', 'FEMALE', 'OTHER', 'NOT_INFORMED');
CREATE TYPE civil_status AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED', 'STABLE_UNION');
CREATE TYPE school_level AS ENUM ('INFANTIL', 'FUNDAMENTAL_I', 'FUNDAMENTAL_II', 'MEDIO', 'EJA', 'TECNICO', 'SUPERIOR');
CREATE TYPE school_modality AS ENUM ('REGULAR', 'EJA', 'ESPECIAL', 'INDIGENA', 'QUILOMBOLA', 'CAMPO');
CREATE TYPE period_type AS ENUM ('MORNING', 'AFTERNOON', 'EVENING', 'FULL_TIME', 'NOCTURNAL');
CREATE TYPE attendance_status AS ENUM ('PRESENT', 'ABSENT', 'JUSTIFIED', 'LATE', 'EARLY_DEPARTURE');
CREATE TYPE grade_status AS ENUM ('APPROVED', 'FAILED', 'RECOVERY', 'TRANSFERRED', 'ABANDONED', 'IN_PROGRESS');
CREATE TYPE enrollment_status AS ENUM ('ACTIVE', 'INACTIVE', 'TRANSFERRED', 'COMPLETED', 'CANCELLED', 'PENDING');
CREATE TYPE transfer_type AS ENUM ('INTERNAL', 'EXTERNAL_IN', 'EXTERNAL_OUT', 'MUNICIPALITY_CHANGE');
CREATE TYPE document_type AS ENUM ('RG', 'CPF', 'BIRTH_CERTIFICATE', 'PROOF_RESIDENCE', 'VACCINATION_CARD', 'PHOTO', 'MEDICAL_REPORT');
CREATE TYPE evaluation_type AS ENUM ('NUMERIC', 'CONCEPT', 'DESCRIPTIVE', 'PORTFOLIO');
CREATE TYPE recovery_type AS ENUM ('PARALLEL', 'FINAL', 'EXTRAORDINARY', 'DEPENDENCY');

-- ===============================================
-- 2. TABELAS PRINCIPAIS - PESSOAS E VÍNCULOS
-- ===============================================

-- Tabela expandida de pessoas
CREATE TABLE people (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Documentos
    cpf VARCHAR(14) UNIQUE NOT NULL,
    rg VARCHAR(20),
    birth_certificate VARCHAR(50),
    
    -- Dados pessoais
    name VARCHAR(255) NOT NULL,
    social_name VARCHAR(255), -- Nome social
    birth_date DATE NOT NULL,
    birth_place VARCHAR(100),
    gender gender_type NOT NULL,
    civil_status civil_status DEFAULT 'SINGLE',
    nationality VARCHAR(100) DEFAULT 'Brasileira',
    
    -- Filiação
    mother_name VARCHAR(255),
    father_name VARCHAR(255),
    
    -- Contato
    phone VARCHAR(20),
    mobile VARCHAR(20),
    email VARCHAR(255),
    
    -- Endereço
    zip_code VARCHAR(10),
    address TEXT,
    address_number VARCHAR(10),
    address_complement VARCHAR(100),
    neighborhood VARCHAR(100),
    city VARCHAR(100),
    state VARCHAR(50),
    
    -- Dados específicos
    photo_url TEXT,
    special_needs BOOLEAN DEFAULT FALSE,
    special_needs_description TEXT,
    
    -- Controle
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de documentos das pessoas
CREATE TABLE person_documents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    person_id UUID REFERENCES people(id) NOT NULL,
    document_type document_type NOT NULL,
    file_name VARCHAR(255),
    file_url TEXT,
    file_size INTEGER,
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES users(id),
    expiry_date DATE,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===============================================
-- 3. ESTRUTURA ESCOLAR
-- ===============================================

-- Escolas expandidas
CREATE TABLE schools (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Identificação oficial
    inep_code VARCHAR(8) UNIQUE,
    code VARCHAR(20) UNIQUE NOT NULL,
    cnpj VARCHAR(18),
    
    -- Dados básicos
    name VARCHAR(255) NOT NULL,
    trade_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    website VARCHAR(255),
    
    -- Endereço
    zip_code VARCHAR(10),
    address TEXT NOT NULL,
    address_number VARCHAR(10),
    address_complement VARCHAR(100),
    neighborhood VARCHAR(100),
    city VARCHAR(100),
    state VARCHAR(50),
    
    -- Gestão
    director_id UUID REFERENCES people(id),
    vice_director_id UUID REFERENCES people(id),
    
    -- Características
    administrative_dependency VARCHAR(50), -- Municipal, Estadual, Federal, Privada
    school_location VARCHAR(50), -- Urbana, Rural
    
    -- Níveis e modalidades oferecidos
    levels school_level[] DEFAULT '{}',
    modalities school_modality[] DEFAULT '{}',
    periods period_type[] DEFAULT '{}',
    
    -- Infraestrutura
    total_classrooms INTEGER DEFAULT 0,
    accessible BOOLEAN DEFAULT FALSE,
    library BOOLEAN DEFAULT FALSE,
    computer_lab BOOLEAN DEFAULT FALSE,
    science_lab BOOLEAN DEFAULT FALSE,
    sports_court BOOLEAN DEFAULT FALSE,
    cafeteria BOOLEAN DEFAULT FALSE,
    
    -- Controle
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Salas de aula
CREATE TABLE classrooms (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    school_id UUID REFERENCES schools(id) NOT NULL,
    name VARCHAR(100) NOT NULL,
    capacity INTEGER NOT NULL,
    area_m2 DECIMAL(8,2),
    accessible BOOLEAN DEFAULT FALSE,
    has_projector BOOLEAN DEFAULT FALSE,
    has_air_conditioning BOOLEAN DEFAULT FALSE,
    has_computer BOOLEAN DEFAULT FALSE,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===============================================
-- 4. ORGANIZAÇÃO ACADÊMICA
-- ===============================================

-- Anos letivos
CREATE TABLE school_years (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    year INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    school_days INTEGER NOT NULL DEFAULT 200,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(year)
);

-- Períodos letivos (bimestres/trimestres)
CREATE TABLE academic_periods (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    school_year_id UUID REFERENCES school_years(id) NOT NULL,
    period_number INTEGER NOT NULL,
    name VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Matérias/Disciplinas expandidas
CREATE TABLE subjects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    abbreviation VARCHAR(10),
    area VARCHAR(100), -- Linguagens, Matemática, Ciências da Natureza, etc.
    workload_per_week INTEGER NOT NULL,
    workload_per_year INTEGER NOT NULL,
    levels school_level[] DEFAULT '{}',
    requires_lab BOOLEAN DEFAULT FALSE,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Série/Ano escolar
CREATE TABLE grades (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    level school_level NOT NULL,
    sequence_order INTEGER,
    min_age INTEGER,
    max_age INTEGER,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Grade curricular
CREATE TABLE curriculum_grid (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    school_id UUID REFERENCES schools(id) NOT NULL,
    grade_id UUID REFERENCES grades(id) NOT NULL,
    subject_id UUID REFERENCES subjects(id) NOT NULL,
    school_year_id UUID REFERENCES school_years(id) NOT NULL,
    weekly_hours INTEGER NOT NULL,
    annual_hours INTEGER NOT NULL,
    required BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(school_id, grade_id, subject_id, school_year_id)
);

-- Turmas expandidas
CREATE TABLE classes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Identificação
    code VARCHAR(20) NOT NULL,
    name VARCHAR(255) NOT NULL,
    
    -- Organização acadêmica
    school_id UUID REFERENCES schools(id) NOT NULL,
    school_year_id UUID REFERENCES school_years(id) NOT NULL,
    grade_id UUID REFERENCES grades(id) NOT NULL,
    
    -- Características
    level school_level NOT NULL,
    modality school_modality DEFAULT 'REGULAR',
    period period_type NOT NULL,
    
    -- Capacidade e ocupação
    capacity INTEGER NOT NULL,
    current_enrollment INTEGER DEFAULT 0,
    
    -- Professores
    homeroom_teacher_id UUID REFERENCES teachers(id),
    
    -- Localização
    classroom_id UUID REFERENCES classrooms(id),
    
    -- Controle
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(school_id, school_year_id, code)
);

-- ===============================================
-- 5. MATRÍCULAS E MOVIMENTAÇÃO
-- ===============================================

-- Matrículas expandidas
CREATE TABLE enrollments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    -- Identificação
    registration_number VARCHAR(50) UNIQUE NOT NULL,
    
    -- Vínculos
    student_id UUID REFERENCES students(id) NOT NULL,
    class_id UUID REFERENCES classes(id) NOT NULL,
    school_year_id UUID REFERENCES school_years(id) NOT NULL,
    
    -- Datas
    enrollment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status enrollment_status DEFAULT 'ACTIVE',
    
    -- Tipo de matrícula
    enrollment_type VARCHAR(50), -- Nova, Renovação, Transferência
    origin_school VARCHAR(255), -- Se transferência
    
    -- Necessidades especiais
    special_needs BOOLEAN DEFAULT FALSE,
    special_needs_description TEXT,
    
    -- Transporte escolar
    needs_transport BOOLEAN DEFAULT FALSE,
    transport_route_id UUID,
    
    -- Alimentação escolar
    needs_meal BOOLEAN DEFAULT TRUE,
    food_restrictions TEXT,
    
    -- Situação final
    final_result grade_status,
    final_grade DECIMAL(4,2),
    final_frequency DECIMAL(5,2),
    
    -- Controle
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transferências
CREATE TABLE transfers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    enrollment_id UUID REFERENCES enrollments(id) NOT NULL,
    transfer_type transfer_type NOT NULL,
    transfer_date DATE NOT NULL,
    
    -- Destino (se saída)
    destination_school VARCHAR(255),
    destination_city VARCHAR(100),
    destination_state VARCHAR(50),
    
    -- Origem (se entrada)
    origin_school VARCHAR(255),
    origin_city VARCHAR(100),
    origin_state VARCHAR(50),
    
    reason TEXT,
    documents_delivered BOOLEAN DEFAULT FALSE,
    
    created_by UUID REFERENCES users(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===============================================
-- 6. FREQUÊNCIA E AVALIAÇÃO
-- ===============================================

-- Frequência diária
CREATE TABLE attendance (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    enrollment_id UUID REFERENCES enrollments(id) NOT NULL,
    subject_id UUID REFERENCES subjects(id) NOT NULL,
    class_date DATE NOT NULL,
    class_time TIME,
    status attendance_status NOT NULL,
    justified BOOLEAN DEFAULT FALSE,
    justification TEXT,
    
    recorded_by UUID REFERENCES users(id) NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(enrollment_id, subject_id, class_date, class_time)
);

-- Configuração de avaliação
CREATE TABLE evaluation_config (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    school_id UUID REFERENCES schools(id) NOT NULL,
    school_year_id UUID REFERENCES school_years(id) NOT NULL,
    grade_id UUID REFERENCES grades(id) NOT NULL,
    
    evaluation_type evaluation_type NOT NULL,
    min_grade DECIMAL(4,2) DEFAULT 0,
    max_grade DECIMAL(4,2) DEFAULT 10,
    passing_grade DECIMAL(4,2) DEFAULT 6,
    min_frequency DECIMAL(5,2) DEFAULT 75,
    
    periods_per_year INTEGER DEFAULT 4,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(school_id, school_year_id, grade_id)
);

-- Instrumentos de avaliação
CREATE TABLE evaluation_instruments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    weight DECIMAL(5,2) NOT NULL DEFAULT 1.0,
    
    school_id UUID REFERENCES schools(id) NOT NULL,
    subject_id UUID REFERENCES subjects(id),
    grade_id UUID REFERENCES grades(id),
    
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notas e avaliações
CREATE TABLE grades_evaluations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    
    enrollment_id UUID REFERENCES enrollments(id) NOT NULL,
    subject_id UUID REFERENCES subjects(id) NOT NULL,
    academic_period_id UUID REFERENCES academic_periods(id) NOT NULL,
    evaluation_instrument_id UUID REFERENCES evaluation_instruments(id),
    
    -- Nota/Conceito
    numeric_grade DECIMAL(4,2),
    concept_grade VARCHAR(2), -- A, B, C, D, E
    descriptive_evaluation TEXT,
    
    -- Metadados
    evaluation_date DATE,
    teacher_id UUID REFERENCES teachers(id) NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===============================================
-- 7. DOCUMENTOS ESCOLARES
-- ===============================================

-- Histórico escolar
CREATE TABLE academic_records (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES students(id) NOT NULL,
    school_year_id UUID REFERENCES school_years(id) NOT NULL,
    grade_id UUID REFERENCES grades(id) NOT NULL,
    school_id UUID REFERENCES schools(id) NOT NULL,
    
    final_result grade_status NOT NULL,
    final_frequency DECIMAL(5,2),
    observations TEXT,
    
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    generated_by UUID REFERENCES users(id) NOT NULL
);

-- Detalhes do histórico por disciplina
CREATE TABLE academic_record_subjects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    academic_record_id UUID REFERENCES academic_records(id) NOT NULL,
    subject_id UUID REFERENCES subjects(id) NOT NULL,
    workload INTEGER,
    final_grade DECIMAL(4,2),
    final_concept VARCHAR(2),
    frequency DECIMAL(5,2),
    result grade_status NOT NULL
);

-- Documentos emitidos
CREATE TABLE issued_documents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES students(id) NOT NULL,
    document_type VARCHAR(50) NOT NULL, -- Histórico, Boletim, Declaração, Certificado
    reference_period VARCHAR(100),
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    validity_date DATE,
    
    -- Autenticação
    document_number VARCHAR(50) UNIQUE,
    verification_code VARCHAR(100) UNIQUE,
    digital_signature TEXT,
    
    -- Arquivo
    file_url TEXT,
    file_hash VARCHAR(256),
    
    issued_by UUID REFERENCES users(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===============================================
-- 8. ÍNDICES PARA PERFORMANCE
-- ===============================================

-- Índices para busca rápida
CREATE INDEX idx_people_cpf ON people(cpf);
CREATE INDEX idx_people_name ON people USING gin(to_tsvector('portuguese', unaccent(name)));
CREATE INDEX idx_people_active ON people(active) WHERE active = true;

CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_class ON enrollments(class_id);
CREATE INDEX idx_enrollments_year ON enrollments(school_year_id);
CREATE INDEX idx_enrollments_status ON enrollments(status) WHERE status = 'ACTIVE';

CREATE INDEX idx_attendance_enrollment ON attendance(enrollment_id);
CREATE INDEX idx_attendance_date ON attendance(class_date);

CREATE INDEX idx_grades_enrollment ON grades_evaluations(enrollment_id);
CREATE INDEX idx_grades_subject ON grades_evaluations(subject_id);
CREATE INDEX idx_grades_period ON grades_evaluations(academic_period_id);

-- ===============================================
-- 9. TRIGGERS E FUNÇÕES
-- ===============================================

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
CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON schools FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON classes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_enrollments_updated_at BEFORE UPDATE ON enrollments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_grades_updated_at BEFORE UPDATE ON grades_evaluations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Função para atualizar número de alunos na turma
CREATE OR REPLACE FUNCTION update_class_enrollment_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE classes 
        SET current_enrollment = (
            SELECT COUNT(*) 
            FROM enrollments 
            WHERE class_id = NEW.class_id AND status = 'ACTIVE'
        )
        WHERE id = NEW.class_id;
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        -- Atualizar turma antiga se mudou
        IF OLD.class_id != NEW.class_id THEN
            UPDATE classes 
            SET current_enrollment = (
                SELECT COUNT(*) 
                FROM enrollments 
                WHERE class_id = OLD.class_id AND status = 'ACTIVE'
            )
            WHERE id = OLD.class_id;
        END IF;
        
        -- Atualizar turma nova
        UPDATE classes 
        SET current_enrollment = (
            SELECT COUNT(*) 
            FROM enrollments 
            WHERE class_id = NEW.class_id AND status = 'ACTIVE'
        )
        WHERE id = NEW.class_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE classes 
        SET current_enrollment = (
            SELECT COUNT(*) 
            FROM enrollments 
            WHERE class_id = OLD.class_id AND status = 'ACTIVE'
        )
        WHERE id = OLD.class_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger para contagem de matrículas
CREATE TRIGGER update_class_enrollment_trigger
    AFTER INSERT OR UPDATE OR DELETE ON enrollments
    FOR EACH ROW EXECUTE FUNCTION update_class_enrollment_count();

-- ===============================================
-- 10. VIEWS PARA RELATÓRIOS
-- ===============================================

-- View para relatório de matrículas por escola
CREATE VIEW vw_enrollment_by_school AS
SELECT 
    s.name as school_name,
    sy.year as school_year,
    g.name as grade_name,
    c.name as class_name,
    COUNT(e.id) as total_enrollments,
    COUNT(CASE WHEN e.status = 'ACTIVE' THEN 1 END) as active_enrollments
FROM schools s
JOIN classes c ON s.id = c.school_id
JOIN enrollments e ON c.id = e.class_id
JOIN school_years sy ON e.school_year_id = sy.id
JOIN grades g ON c.grade_id = g.id
GROUP BY s.id, s.name, sy.year, g.name, c.name
ORDER BY s.name, sy.year, g.sequence_order;

-- View para acompanhamento de frequência
CREATE VIEW vw_attendance_summary AS
SELECT 
    e.id as enrollment_id,
    p.name as student_name,
    s.name as school_name,
    c.name as class_name,
    sub.name as subject_name,
    COUNT(a.id) as total_classes,
    COUNT(CASE WHEN a.status = 'PRESENT' THEN 1 END) as present_classes,
    ROUND((COUNT(CASE WHEN a.status = 'PRESENT' THEN 1 END) * 100.0) / COUNT(a.id), 2) as frequency_percentage
FROM enrollments e
JOIN students st ON e.student_id = st.id
JOIN people p ON st.person_id = p.id
JOIN classes c ON e.class_id = c.id
JOIN schools s ON c.school_id = s.id
JOIN attendance a ON e.id = a.enrollment_id
JOIN subjects sub ON a.subject_id = sub.id
WHERE e.status = 'ACTIVE'
GROUP BY e.id, p.name, s.name, c.name, sub.name;

-- View para notas por período
CREATE VIEW vw_grades_by_period AS
SELECT 
    e.id as enrollment_id,
    p.name as student_name,
    sub.name as subject_name,
    ap.name as period_name,
    AVG(ge.numeric_grade) as average_grade,
    STRING_AGG(ge.concept_grade, ', ') as concepts
FROM enrollments e
JOIN students st ON e.student_id = st.id
JOIN people p ON st.person_id = p.id
JOIN grades_evaluations ge ON e.id = ge.enrollment_id
JOIN subjects sub ON ge.subject_id = sub.id
JOIN academic_periods ap ON ge.academic_period_id = ap.id
WHERE e.status = 'ACTIVE'
GROUP BY e.id, p.name, sub.name, ap.name, ap.period_number
ORDER BY p.name, sub.name, ap.period_number;

-- ===============================================
-- 11. COMENTÁRIOS PARA DOCUMENTAÇÃO
-- ===============================================

COMMENT ON TABLE people IS 'Cadastro completo de todas as pessoas do sistema educacional';
COMMENT ON TABLE schools IS 'Unidades escolares com toda infraestrutura e características';
COMMENT ON TABLE classes IS 'Turmas organizadas por ano letivo, série e período';
COMMENT ON TABLE enrollments IS 'Matrículas dos alunos com controle de movimentação';
COMMENT ON TABLE attendance IS 'Frequência diária por disciplina e aula';
COMMENT ON TABLE grades_evaluations IS 'Sistema completo de notas e avaliações';
COMMENT ON TABLE academic_records IS 'Histórico escolar oficial dos alunos';

-- ===============================================
-- 12. DADOS INICIAIS EXPANDIDOS
-- ===============================================

-- Ano letivo atual
INSERT INTO school_years (year, start_date, end_date, school_days) VALUES
(2025, '2025-02-01', '2025-12-15', 200);

-- Períodos acadêmicos (bimestres)
INSERT INTO academic_periods (school_year_id, period_number, name, start_date, end_date) 
SELECT 
    sy.id,
    1,
    '1º Bimestre',
    '2025-02-01',
    '2025-04-30'
FROM school_years sy WHERE sy.year = 2025;

INSERT INTO academic_periods (school_year_id, period_number, name, start_date, end_date) 
SELECT 
    sy.id,
    2,
    '2º Bimestre',
    '2025-05-01',
    '2025-07-15'
FROM school_years sy WHERE sy.year = 2025;

INSERT INTO academic_periods (school_year_id, period_number, name, start_date, end_date) 
SELECT 
    sy.id,
    3,
    '3º Bimestre',
    '2025-08-01',
    '2025-10-15'
FROM school_years sy WHERE sy.year = 2025;

INSERT INTO academic_periods (school_year_id, period_number, name, start_date, end_date) 
SELECT 
    sy.id,
    4,
    '4º Bimestre',
    '2025-10-16',
    '2025-12-15'
FROM school_years sy WHERE sy.year = 2025;

-- Séries/Anos escolares
INSERT INTO grades (code, name, level, sequence_order, min_age, max_age) VALUES
('INF4', 'Infantil 4 anos', 'INFANTIL', 1, 4, 4),
('INF5', 'Infantil 5 anos', 'INFANTIL', 2, 5, 5),
('1ANO', '1º Ano', 'FUNDAMENTAL_I', 3, 6, 7),
('2ANO', '2º Ano', 'FUNDAMENTAL_I', 4, 7, 8),
('3ANO', '3º Ano', 'FUNDAMENTAL_I', 5, 8, 9),
('4ANO', '4º Ano', 'FUNDAMENTAL_I', 6, 9, 10),
('5ANO', '5º Ano', 'FUNDAMENTAL_I', 7, 10, 11),
('6ANO', '6º Ano', 'FUNDAMENTAL_II', 8, 11, 12),
('7ANO', '7º Ano', 'FUNDAMENTAL_II', 9, 12, 13),
('8ANO', '8º Ano', 'FUNDAMENTAL_II', 10, 13, 14),
('9ANO', '9º Ano', 'FUNDAMENTAL_II', 11, 14, 15),
('1MED', '1ª Série - Ensino Médio', 'MEDIO', 12, 15, 17),
('2MED', '2ª Série - Ensino Médio', 'MEDIO', 13, 16, 18),
('3MED', '3ª Série - Ensino Médio', 'MEDIO', 14, 17, 19);

-- Disciplinas expandidas
INSERT INTO subjects (code, name, abbreviation, area, workload_per_week, workload_per_year, levels) VALUES
-- Educação Infantil
('LPTINF', 'Linguagem', 'LPT', 'Linguagens', 5, 200, '{INFANTIL}'),
('MATINF', 'Matemática', 'MAT', 'Matemática', 5, 200, '{INFANTIL}'),
('NATINF', 'Natureza e Sociedade', 'NAT', 'Ciências da Natureza', 3, 120, '{INFANTIL}'),
('ARTINF', 'Artes', 'ART', 'Linguagens', 2, 80, '{INFANTIL}'),
('EDFINF', 'Educação Física', 'EDF', 'Linguagens', 2, 80, '{INFANTIL}'),

-- Fundamental I
('LPT', 'Língua Portuguesa', 'LPT', 'Linguagens', 6, 240, '{FUNDAMENTAL_I}'),
('MAT', 'Matemática', 'MAT', 'Matemática', 6, 240, '{FUNDAMENTAL_I}'),
('HIS', 'História', 'HIS', 'Ciências Humanas', 2, 80, '{FUNDAMENTAL_I}'),
('GEO', 'Geografia', 'GEO', 'Ciências Humanas', 2, 80, '{FUNDAMENTAL_I}'),
('CIE', 'Ciências', 'CIE', 'Ciências da Natureza', 3, 120, '{FUNDAMENTAL_I}'),
('ART', 'Arte', 'ART', 'Linguagens', 2, 80, '{FUNDAMENTAL_I}'),
('EDF', 'Educação Física', 'EDF', 'Linguagens', 2, 80, '{FUNDAMENTAL_I}'),

-- Fundamental II
('LPTF2', 'Língua Portuguesa', 'LPT', 'Linguagens', 5, 200, '{FUNDAMENTAL_II}'),
('MATF2', 'Matemática', 'MAT', 'Matemática', 5, 200, '{FUNDAMENTAL_II}'),
('HISF2', 'História', 'HIS', 'Ciências Humanas', 3, 120, '{FUNDAMENTAL_II}'),
('GEOF2', 'Geografia', 'GEO', 'Ciências Humanas', 3, 120, '{FUNDAMENTAL_II}'),
('CIEF2', 'Ciências', 'CIE', 'Ciências da Natureza', 4, 160, '{FUNDAMENTAL_II}'),
('ARTF2', 'Arte', 'ART', 'Linguagens', 2, 80, '{FUNDAMENTAL_II}'),
('EDFF2', 'Educação Física', 'EDF', 'Linguagens', 2, 80, '{FUNDAMENTAL_II}'),
('ING', 'Língua Inglesa', 'ING', 'Linguagens', 2, 80, '{FUNDAMENTAL_II}'),

-- Ensino Médio
('LPTMED', 'Língua Portuguesa', 'LPT', 'Linguagens', 4, 160, '{MEDIO}'),
('MATMED', 'Matemática', 'MAT', 'Matemática', 4, 160, '{MEDIO}'),
('HISMED', 'História', 'HIS', 'Ciências Humanas', 2, 80, '{MEDIO}'),
('GEOMED', 'Geografia', 'GEO', 'Ciências Humanas', 2, 80, '{MEDIO}'),
('FIS', 'Física', 'FIS', 'Ciências da Natureza', 3, 120, '{MEDIO}'),
('QUI', 'Química', 'QUI', 'Ciências da Natureza', 3, 120, '{MEDIO}'),
('BIO', 'Biologia', 'BIO', 'Ciências da Natureza', 3, 120, '{MEDIO}'),
('FIL', 'Filosofia', 'FIL', 'Ciências Humanas', 1, 40, '{MEDIO}'),
('SOC', 'Sociologia', 'SOC', 'Ciências Humanas', 1, 40, '{MEDIO}'),
('ARTMED', 'Arte', 'ART', 'Linguagens', 1, 40, '{MEDIO}'),
('EDFMED', 'Educação Física', 'EDF', 'Linguagens', 2, 80, '{MEDIO}'),
('INGMED', 'Língua Inglesa', 'ING', 'Linguagens', 2, 80, '{MEDIO}');

-- ===============================================
-- RESULTADO FINAL
-- ===============================================

SELECT '✅ SCHEMA COMPLETO DO MÓDULO SECRETÁRIO ESCOLAR CRIADO COM SUCESSO!' as resultado;
