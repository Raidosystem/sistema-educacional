export type UserRole = 
  | 'student'
  | 'parent'
  | 'teacher'
  | 'coordinator'
  | 'director'
  | 'secretary'
  | 'admin'
  | 'evaluator'

export type EducacaoInfantilSegment = 
  | 'berçario_1'   // 0-12 meses
  | 'berçario_2'   // 1-2 anos
  | 'maternal_1'   // 2 anos
  | 'maternal_2'   // 3 anos
  | 'jardim_1'     // 4 anos
  | 'jardim_2'     // 5 anos

export type CampoExperienciaBNCC =
  | 'eu_outro_nos'
  | 'corpo_gestos_movimentos'
  | 'tracos_sons_cores_formas'
  | 'escuta_fala_pensamento_imaginacao'
  | 'espaco_tempo_quantidades_relacoes_transformacoes'

export type TipoMaterial =
  | 'multidisciplinar'
  | 'arte'
  | 'ingles'
  | 'caligrafia'
  | 'atividades'
  | 'literatura'
  | 'alfabetizacao'
  | 'saeb'
  | 'ed_fisica'
  | 'agenda'
  | 'familia'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  schoolId?: string
  classId?: string
  avatar?: string
  studentIds?: string[]
}

export interface School {
  id: string
  name: string
  code: string
  network: string
  address: string
  studentsCount: number
  teachersCount: number
}

export interface Class {
  id: string
  name: string
  grade: string
  stage: string
  schoolId: string
  teacherId: string
  studentsCount: number
}

export interface Student {
  id: string
  name: string
  email: string
  classId: string
  schoolId: string
  enrollmentNumber: string
  parentIds: string[]
  avatar?: string
  birthDate: string
  status: 'active' | 'inactive' | 'transferred'
  enrollmentDate: string
}

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: string
  enrolled: number
  maxEnrollment: number
  category: string
  thumbnail?: string
  status: 'active' | 'upcoming' | 'completed'
}

export interface Assessment {
  id: string
  title: string
  subject: string
  grade: string
  date: string
  totalQuestions: number
  appliedTo: number
  averageScore: number
}

export interface AssessmentResult {
  id: string
  assessmentId: string
  studentId: string
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: string
  date: string
  bySubject: {
    subject: string
    correct: number
    total: number
  }[]
}

export interface Material {
  id: string
  title: string
  description: string
  type: 'document' | 'video' | 'audio' | 'interactive'
  subject: string
  grade: string
  stage: string
  url: string
  thumbnail?: string
  downloadable: boolean
}

export interface Announcement {
  id: string
  title: string
  content: string
  author: string
  date: string
  targetRoles: UserRole[]
  priority: 'low' | 'medium' | 'high'
  read: boolean
}

export interface DashboardStats {
  totalStudents: number
  totalTeachers: number
  totalSchools: number
  activeAssessments: number
  averagePerformance: number
  coursesCompleted: number
  pendingNotifications: number
  recentActivity: number
}

export interface StudentPerformance {
  studentId: string
  studentName: string
  overallAverage: number
  attendanceRate: number
  assignmentsCompleted: number
  totalAssignments: number
  subjectPerformance: {
    subject: string
    average: number
    trend: 'up' | 'down' | 'stable'
  }[]
  recentAssessments: {
    assessmentId: string
    title: string
    score: number
    date: string
  }[]
  strengths: string[]
  improvements: string[]
}

export interface Attendance {
  id: string
  studentId: string
  date: string
  status: 'present' | 'absent' | 'late' | 'excused'
  notes?: string
}

export interface Grade {
  id: string
  studentId: string
  subject: string
  assessmentId: string
  score: number
  maxScore: number
  date: string
  feedback?: string
}

export type NotificationType = 
  | 'attendance-absence'
  | 'attendance-late'
  | 'grade-posted'
  | 'grade-low'
  | 'grade-high'
  | 'announcement'
  | 'general'
  | 'custom-message'

export interface ParentNotification {
  id: string
  parentId: string
  studentId: string
  studentName: string
  type: NotificationType
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: 'low' | 'medium' | 'high'
  relatedData?: {
    gradeId?: string
    attendanceId?: string
    subject?: string
    score?: number
    maxScore?: number
    date?: string
    status?: string
    senderId?: string
    senderName?: string
    category?: string
  }
}

export interface CustomMessage {
  id: string
  senderId: string
  senderName: string
  senderRole: UserRole
  recipientParentIds: string[]
  studentId: string
  studentName: string
  category: 'behavioral' | 'academic' | 'attendance' | 'health' | 'general'
  subject: string
  message: string
  priority: 'low' | 'medium' | 'high'
  timestamp: string
  requiresResponse: boolean
  responseReceived?: boolean
}

// ==================== MATERIAIS DIGITAIS ====================
export interface MaterialDigital {
  id: string
  titulo: string
  tipo: TipoMaterial
  anoEscolar: string
  segmento: 'infantil' | 'fundamental'
  url: string
  formato: 'pdf' | 'video' | 'audio' | 'interativo'
  descricao: string
  thumbnail: string
}

export interface LivroLiteratura {
  id: string
  titulo: string
  autor: string
  anoEscolar: string
  capa: string
  urlLeitura: string
  genero: string
  paginas: number
}

// ==================== AVALIAÇÕES ====================
export interface Questao {
  id: string
  disciplina: string
  anoEscolar: string
  habilidadeBNCC: string
  dificuldade: 'facil' | 'medio' | 'dificil'
  enunciado: string
  tipo: 'multipla_escolha' | 'dissertativa'
  alternativas?: string[] | { letra: string; texto: string }[]
  gabarito: string
  tags?: string[]
  estatisticas: {
    vezesAplicada: number
    taxaAcerto: number
    discriminacao: number
  }
}

export interface Avaliacao {
  id: string
  titulo: string
  tipo: 'diagnostica' | 'formativa' | 'somativa' | 'simulado'
  disciplina: string
  anoEscolar: string
  dataAplicacao: string
  questoes: Questao[]
  matrizSAEB?: boolean
}

export interface ResultadoAvaliacao {
  id: string
  avaliacaoId: string
  alunoId: string
  respostas: { questaoId: string; resposta: string }[]
  nota: number
  proficienciaTRI?: number
  dataRealizacao: string
}

// ==================== CURSOS E FORMAÇÃO ====================
export interface Curso {
  id: string
  titulo: string
  modalidade: 'presencial' | 'online' | 'hibrido'
  cargaHoraria: number
  publico: UserRole[]
  descricao: string
  instrutor: string
  dataInicio: string
  dataFim: string
  certificado: boolean
  vagas: number
  inscritos: number
  local: string
  vagasOcupadas: number
}

export interface Inscricao {
  id: string
  cursoId: string
  userId: string
  dataInscricao: string
  status: 'confirmada' | 'aguardando' | 'cancelada' | 'em_andamento' | 'concluido'
  frequencia: number
  concluido: boolean
  progressoPorcentagem: number
  dataConclusao?: string
  certificadoEmitido: boolean
}

// ==================== ASSESSORIA PEDAGÓGICA ====================
export interface AssessoriaPedagogica {
  id: string
  titulo: string
  descricao: string
  data: string
  horario: string
  modalidade: 'presencial' | 'online' | 'hibrido'
  local: string
  assessor: string
  escolas: string[]
  participantes: string[] | number
  cargaHoraria: number
  materiaisCompartilhados: string[]
  status: 'concluido' | 'agendado' | 'cancelado'
  relatorioDisponivel?: boolean
}

// ==================== RELATÓRIOS ====================
export interface RelatorioTurma {
  id: string
  turmaId: string
  turmaNome: string
  turmaIdentificacao: string
  professorResponsavel: string
  mediaGeral: number
  totalAlunos: number
  taxaFrequencia: number
  proficienciaTRIMedia: number
  disciplinas: { [key: string]: number }
  distribuicaoProficiencia: { [key: string]: number }
  alunosDestaque?: Student[]
  alunosAtencao?: Student[]
  distribuicaoNotas?: { faixa: string; quantidade: number }[]
}

export interface RelatorioEscola {
  id: string
  escolaId: string
  escolaNome: string
  totalTurmas: number
  totalAlunos: number
  mediaGeral: number
  proficienciaTRIMedia: number
  taxaFrequencia: number
  periodo?: string
  disciplinas: { [key: string]: number }
  distribuicaoProficiencia: { [key: string]: number }
  turmas?: RelatorioTurma[]
  comparativoRede?: number
}
