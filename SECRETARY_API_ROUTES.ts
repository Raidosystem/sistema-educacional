// 🎓 API ROUTES - MÓDULO SECRETÁRIO ESCOLAR
// Routes completas para todas as funcionalidades

import { Router } from 'express'
import { Request, Response } from 'express'
import { authMiddleware } from '../middleware/auth.middleware'
import { validateRole } from '../middleware/role.middleware'
import { validateInput } from '../middleware/validation.middleware'

const router = Router()

// ===============================================
// 1. PESSOAS - CRUD COMPLETO
// ===============================================

// Listar pessoas com filtros avançados
router.get('/people', authMiddleware, async (req: Request, res: Response) => {
  try {
    const {
      search,
      type, // student, teacher, parent, staff
      active = true,
      page = 1,
      limit = 20,
      sort = 'name'
    } = req.query

    let query = supabase
      .from('people')
      .select(`
        *,
        students(id, registration),
        teachers(id, registration, specialization),
        parents(id),
        person_documents(id, document_type, file_url, verified)
      `)
      
    // Filtros
    if (search) {
      query = query.or(
        `name.ilike.%${search}%,cpf.ilike.%${search}%,email.ilike.%${search}%`
      )
    }
    
    if (active !== undefined) {
      query = query.eq('active', active)
    }

    // Paginação
    const offset = (Number(page) - 1) * Number(limit)
    query = query.range(offset, offset + Number(limit) - 1)

    // Ordenação
    query = query.order(sort as string)

    const { data, error, count } = await query

    if (error) throw error

    res.json({
      data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: count,
        pages: Math.ceil((count || 0) / Number(limit))
      }
    })
  } catch (error) {
    console.error('Erro ao listar pessoas:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

// Buscar pessoa por ID com relacionamentos
router.get('/people/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const { data, error } = await supabase
      .from('people')
      .select(`
        *,
        students(
          id, registration, allergies, medications, observations,
          enrollments(
            id, registration_number, enrollment_date, status,
            class:classes(id, name, grade:grades(name, level)),
            school:schools(id, name)
          )
        ),
        teachers(
          id, registration, specialization,
          classes(id, name, current_enrollment)
        ),
        parents(
          id,
          student_parents(
            student:students(
              id, registration,
              person:people(name)
            )
          )
        ),
        person_documents(
          id, document_type, file_name, file_url, 
          expiry_date, verified, created_at
        )
      `)
      .eq('id', id)
      .single()

    if (error) throw error
    if (!data) {
      return res.status(404).json({ error: 'Pessoa não encontrada' })
    }

    res.json(data)
  } catch (error) {
    console.error('Erro ao buscar pessoa:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

// Criar nova pessoa
router.post('/people', 
  authMiddleware, 
  validateRole(['ADMIN', 'SECRETARY']),
  validateInput([
    'cpf', 'name', 'birth_date', 'gender'
  ]),
  async (req: Request, res: Response) => {
    try {
      const personData = req.body

      // Verificar se CPF já existe
      const { data: existing } = await supabase
        .from('people')
        .select('id')
        .eq('cpf', personData.cpf)
        .single()

      if (existing) {
        return res.status(400).json({ 
          error: 'CPF já cadastrado no sistema' 
        })
      }

      const { data, error } = await supabase
        .from('people')
        .insert([personData])
        .select()
        .single()

      if (error) throw error

      res.status(201).json(data)
    } catch (error) {
      console.error('Erro ao criar pessoa:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
)

// Atualizar pessoa
router.put('/people/:id',
  authMiddleware,
  validateRole(['ADMIN', 'SECRETARY']),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const updates = req.body

      const { data, error } = await supabase
        .from('people')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      if (!data) {
        return res.status(404).json({ error: 'Pessoa não encontrada' })
      }

      res.json(data)
    } catch (error) {
      console.error('Erro ao atualizar pessoa:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
)

// ===============================================
// 2. ESCOLAS - GESTÃO COMPLETA
// ===============================================

// Listar escolas
router.get('/schools', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { active = true } = req.query

    const { data, error } = await supabase
      .from('schools')
      .select(`
        *,
        director:people!schools_director_id_fkey(id, name),
        vice_director:people!schools_vice_director_id_fkey(id, name),
        classrooms(id, name, capacity),
        classes(
          id, name, current_enrollment, capacity,
          grade:grades(name, level)
        )
      `)
      .eq('active', active)
      .order('name')

    if (error) throw error

    res.json(data)
  } catch (error) {
    console.error('Erro ao listar escolas:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

// Criar escola
router.post('/schools',
  authMiddleware,
  validateRole(['ADMIN']),
  validateInput(['code', 'name', 'address']),
  async (req: Request, res: Response) => {
    try {
      const schoolData = req.body

      const { data, error } = await supabase
        .from('schools')
        .insert([schoolData])
        .select()
        .single()

      if (error) throw error

      res.status(201).json(data)
    } catch (error) {
      console.error('Erro ao criar escola:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
)

// ===============================================
// 3. MATRÍCULAS - GESTÃO COMPLETA
// ===============================================

// Listar matrículas com filtros
router.get('/enrollments', authMiddleware, async (req: Request, res: Response) => {
  try {
    const {
      school_id,
      class_id,
      status = 'ACTIVE',
      school_year,
      page = 1,
      limit = 50
    } = req.query

    let query = supabase
      .from('enrollments')
      .select(`
        *,
        student:students(
          id, registration,
          person:people(id, name, cpf, birth_date)
        ),
        class:classes(
          id, name, capacity, current_enrollment,
          grade:grades(id, name, level),
          school:schools(id, name)
        ),
        school_year:school_years(id, year)
      `)

    // Filtros
    if (school_id) {
      query = query.eq('classes.school_id', school_id)
    }
    if (class_id) {
      query = query.eq('class_id', class_id)
    }
    if (status) {
      query = query.eq('status', status)
    }
    if (school_year) {
      query = query.eq('school_years.year', school_year)
    }

    // Paginação
    const offset = (Number(page) - 1) * Number(limit)
    query = query.range(offset, offset + Number(limit) - 1)

    const { data, error, count } = await query

    if (error) throw error

    res.json({
      data,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: count,
        pages: Math.ceil((count || 0) / Number(limit))
      }
    })
  } catch (error) {
    console.error('Erro ao listar matrículas:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
})

// Criar matrícula
router.post('/enrollments',
  authMiddleware,
  validateRole(['ADMIN', 'SECRETARY']),
  validateInput(['student_id', 'class_id', 'school_year_id']),
  async (req: Request, res: Response) => {
    try {
      const enrollmentData = {
        ...req.body,
        registration_number: await generateRegistrationNumber(),
        enrollment_date: new Date().toISOString().split('T')[0]
      }

      // Verificar capacidade da turma
      const { data: classInfo } = await supabase
        .from('classes')
        .select('capacity, current_enrollment')
        .eq('id', enrollmentData.class_id)
        .single()

      if (classInfo && classInfo.current_enrollment >= classInfo.capacity) {
        return res.status(400).json({
          error: 'Turma já atingiu sua capacidade máxima'
        })
      }

      const { data, error } = await supabase
        .from('enrollments')
        .insert([enrollmentData])
        .select(`
          *,
          student:students(
            person:people(name)
          ),
          class:classes(
            name,
            school:schools(name)
          )
        `)
        .single()

      if (error) throw error

      res.status(201).json(data)
    } catch (error) {
      console.error('Erro ao criar matrícula:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
)

// ===============================================
// 4. FREQUÊNCIA - CONTROLE DIÁRIO
// ===============================================

// Registrar frequência da turma
router.post('/attendance/class',
  authMiddleware,
  validateRole(['ADMIN', 'SECRETARY', 'TEACHER']),
  async (req: Request, res: Response) => {
    try {
      const {
        class_id,
        subject_id,
        class_date,
        class_time,
        attendance_records // Array de {enrollment_id, status, justification}
      } = req.body

      const attendanceData = attendance_records.map((record: any) => ({
        ...record,
        subject_id,
        class_date,
        class_time,
        recorded_by: req.user.id,
        recorded_at: new Date().toISOString()
      }))

      const { data, error } = await supabase
        .from('attendance')
        .upsert(attendanceData, {
          onConflict: 'enrollment_id,subject_id,class_date,class_time'
        })
        .select()

      if (error) throw error

      res.json({
        message: 'Frequência registrada com sucesso',
        records: data?.length || 0
      })
    } catch (error) {
      console.error('Erro ao registrar frequência:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
)

// Relatório de frequência
router.get('/attendance/report',
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const {
        enrollment_id,
        class_id,
        subject_id,
        start_date,
        end_date
      } = req.query

      let query = supabase
        .from('vw_attendance_summary')
        .select('*')

      if (enrollment_id) query = query.eq('enrollment_id', enrollment_id)
      if (class_id) query = query.eq('class_id', class_id)
      if (subject_id) query = query.eq('subject_id', subject_id)

      const { data, error } = await query

      if (error) throw error

      res.json(data)
    } catch (error) {
      console.error('Erro ao gerar relatório de frequência:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
)

// ===============================================
// 5. NOTAS E AVALIAÇÕES
// ===============================================

// Lançar notas
router.post('/grades',
  authMiddleware,
  validateRole(['ADMIN', 'SECRETARY', 'TEACHER']),
  async (req: Request, res: Response) => {
    try {
      const {
        enrollment_id,
        subject_id,
        academic_period_id,
        evaluation_instrument_id,
        numeric_grade,
        concept_grade,
        descriptive_evaluation,
        evaluation_date
      } = req.body

      const gradeData = {
        enrollment_id,
        subject_id,
        academic_period_id,
        evaluation_instrument_id,
        numeric_grade,
        concept_grade,
        descriptive_evaluation,
        evaluation_date,
        teacher_id: req.user.id
      }

      const { data, error } = await supabase
        .from('grades_evaluations')
        .upsert([gradeData])
        .select(`
          *,
          enrollment:enrollments(
            student:students(
              person:people(name)
            )
          ),
          subject:subjects(name),
          academic_period:academic_periods(name)
        `)
        .single()

      if (error) throw error

      res.status(201).json(data)
    } catch (error) {
      console.error('Erro ao lançar nota:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
)

// Boletim do aluno
router.get('/grades/report/:enrollment_id',
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { enrollment_id } = req.params
      const { school_year_id } = req.query

      const { data, error } = await supabase
        .from('vw_grades_by_period')
        .select('*')
        .eq('enrollment_id', enrollment_id)

      if (error) throw error

      res.json(data)
    } catch (error) {
      console.error('Erro ao gerar boletim:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
)

// ===============================================
// 6. DOCUMENTOS ESCOLARES
// ===============================================

// Gerar histórico escolar
router.post('/documents/academic-record',
  authMiddleware,
  validateRole(['ADMIN', 'SECRETARY']),
  async (req: Request, res: Response) => {
    try {
      const { student_id, school_year_id } = req.body

      // Buscar dados do aluno
      const { data: studentData } = await supabase
        .from('students')
        .select(`
          *,
          person:people(*),
          enrollments(
            *,
            class:classes(
              grade:grades(name, level),
              school:schools(name)
            ),
            grades_evaluations(
              subject:subjects(name, workload_per_year),
              numeric_grade,
              concept_grade
            )
          )
        `)
        .eq('id', student_id)
        .single()

      if (!studentData) {
        return res.status(404).json({ error: 'Aluno não encontrado' })
      }

      // Gerar documento
      const document = await generateAcademicRecord(studentData)

      // Salvar registro
      const { data: recordData, error } = await supabase
        .from('academic_records')
        .insert([{
          student_id,
          school_year_id,
          grade_id: studentData.enrollments[0]?.class?.grade?.id,
          school_id: studentData.enrollments[0]?.class?.school?.id,
          final_result: 'APPROVED', // Calcular automaticamente
          generated_by: req.user.id
        }])
        .select()
        .single()

      if (error) throw error

      res.json({
        record: recordData,
        document
      })
    } catch (error) {
      console.error('Erro ao gerar histórico:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
)

// ===============================================
// 7. RELATÓRIOS GERENCIAIS
// ===============================================

// Dashboard do secretário
router.get('/dashboard',
  authMiddleware,
  validateRole(['ADMIN', 'SECRETARY']),
  async (req: Request, res: Response) => {
    try {
      const { school_id } = req.query
      const currentYear = new Date().getFullYear()

      // Estatísticas principais
      const stats = await Promise.all([
        // Total de alunos ativos
        supabase
          .from('enrollments')
          .select('id', { count: 'exact' })
          .eq('status', 'ACTIVE')
          .eq('school_years.year', currentYear),

        // Total de turmas
        supabase
          .from('classes')
          .select('id', { count: 'exact' })
          .eq('active', true)
          .eq('school_year_id', currentYear),

        // Taxa de frequência média
        supabase
          .from('vw_attendance_summary')
          .select('frequency_percentage'),

        // Matrículas por mês
        supabase
          .from('enrollments')
          .select('enrollment_date')
          .eq('school_years.year', currentYear)
          .gte('enrollment_date', `${currentYear}-01-01`)
      ])

      const dashboard = {
        total_students: stats[0].count || 0,
        total_classes: stats[1].count || 0,
        average_frequency: stats[2].data?.reduce((sum, item) => 
          sum + item.frequency_percentage, 0) / (stats[2].data?.length || 1),
        monthly_enrollments: processMonthlyEnrollments(stats[3].data || [])
      }

      res.json(dashboard)
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error)
      res.status(500).json({ error: 'Erro interno do servidor' })
    }
  }
)

// ===============================================
// FUNÇÕES AUXILIARES
// ===============================================

async function generateRegistrationNumber(): Promise<string> {
  const year = new Date().getFullYear()
  const { count } = await supabase
    .from('enrollments')
    .select('id', { count: 'exact' })
    .like('registration_number', `${year}%`)

  return `${year}${String((count || 0) + 1).padStart(6, '0')}`
}

async function generateAcademicRecord(studentData: any) {
  // Implementar geração de PDF do histórico escolar
  return {
    url: '/documents/academic-record.pdf',
    generated_at: new Date().toISOString()
  }
}

function processMonthlyEnrollments(enrollments: any[]) {
  // Processar dados para gráfico mensal
  const months = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    count: 0
  }))

  enrollments.forEach(enrollment => {
    const month = new Date(enrollment.enrollment_date).getMonth()
    months[month].count++
  })

  return months
}

export { router as secretaryRoutes }
