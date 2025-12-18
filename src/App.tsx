import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { MobileNav } from '@/components/MobileNav'
import { DashboardView } from '@/components/DashboardView'
import { MaterialsView } from '@/components/MaterialsView'
import { AssessmentsView } from '@/components/AssessmentsView'
import { CoursesView } from '@/components/CoursesView'
import { NotificationsView } from '@/components/NotificationsView'
import { ParentNotificationsView } from '@/components/ParentNotificationsView'
import { StudentsView } from '@/components/StudentsView'
import { StudentProfileView } from '@/components/StudentProfileView'
import { ParentPortalView } from '@/components/ParentPortalView'
import { TeacherMessagingView } from '@/components/TeacherMessagingView'
import BibliotecaView from '@/components/BibliotecaView'
import AvaliacoesAvancadasView from '@/components/AvaliacoesAvancadasView'
import CursosView from '@/components/CursosView'
import EducacaoInfantilView from '@/components/EducacaoInfantilView'
import AssessoriaPedagogicaView from '@/components/AssessoriaPedagogicaView'
import BancoQuestoesView from '@/components/BancoQuestoesView'
import RelatoriosView from '@/components/RelatoriosView'
import PreparacaoSAEBView from '@/components/PreparacaoSAEBView'
import ApoioAlfabetizacaoView from '@/components/ApoioAlfabetizacaoView'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'
import { generateAttendanceNotification, generateGradeNotification, generateCustomMessageNotification } from '@/lib/notificationService'
import type {
  User,
  UserRole,
  DashboardStats,
  Announcement,
  Material,
  Assessment,
  AssessmentResult,
  Course,
  Student,
  StudentPerformance,
  Attendance,
  Grade,
  ParentNotification,
  CustomMessage
} from '@/lib/types'

function App() {
  const [activeSection, setActiveSection] = useState('dashboard')
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null)
  
  const [currentUser, setCurrentUser] = useState<User>({
    id: 'user-1',
    name: 'Maria Silva',
    email: 'maria.silva@escola.edu.br',
    role: 'coordinator',
    studentIds: ['student-1', 'student-2']
  })

  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [materials] = useState<Material[]>([])
  const [assessments] = useState<Assessment[]>([])
  const [assessmentResults] = useState<AssessmentResult[]>([])
  const [courses] = useState<Course[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [studentPerformances, setStudentPerformances] = useState<StudentPerformance[]>([])
  const [attendance, setAttendance] = useState<Attendance[]>([])
  const [grades, setGrades] = useState<Grade[]>([])
  const [parentNotifications, setParentNotifications] = useState<ParentNotification[]>([])
  const [customMessages, setCustomMessages] = useState<CustomMessage[]>([])

  const [stats] = useState<DashboardStats>({
    totalStudents: 0,
    totalTeachers: 0,
    totalSchools: 0,
    activeAssessments: 0,
    averagePerformance: 0,
    coursesCompleted: 0,
    pendingNotifications: 0,
    recentActivity: 0
  })

  useEffect(() => {
    if (!students || students.length === 0) {
      initializeSampleData()
    }
  }, [])

  const initializeSampleData = () => {
    const sampleStudents: Student[] = [
      {
        id: 'student-1',
        name: 'João Pedro Santos',
        email: 'joao.santos@aluno.edu.br',
        classId: 'class-1',
        schoolId: 'school-1',
        enrollmentNumber: '2024001',
        parentIds: ['parent-1'],
        birthDate: '2010-05-15',
        status: 'active',
        enrollmentDate: '2024-02-01'
      },
      {
        id: 'student-2',
        name: 'Ana Carolina Lima',
        email: 'ana.lima@aluno.edu.br',
        classId: 'class-1',
        schoolId: 'school-1',
        enrollmentNumber: '2024002',
        parentIds: ['parent-2'],
        birthDate: '2010-08-22',
        status: 'active',
        enrollmentDate: '2024-02-01'
      },
      {
        id: 'student-3',
        name: 'Lucas Oliveira',
        email: 'lucas.oliveira@aluno.edu.br',
        classId: 'class-1',
        schoolId: 'school-1',
        enrollmentNumber: '2024003',
        parentIds: ['parent-3'],
        birthDate: '2010-03-10',
        status: 'active',
        enrollmentDate: '2024-02-01'
      },
      {
        id: 'student-4',
        name: 'Beatriz Costa',
        email: 'beatriz.costa@aluno.edu.br',
        classId: 'class-2',
        schoolId: 'school-1',
        enrollmentNumber: '2024004',
        parentIds: ['parent-4'],
        birthDate: '2011-11-05',
        status: 'active',
        enrollmentDate: '2024-02-01'
      },
      {
        id: 'student-5',
        name: 'Gabriel Ferreira',
        email: 'gabriel.ferreira@aluno.edu.br',
        classId: 'class-2',
        schoolId: 'school-1',
        enrollmentNumber: '2024005',
        parentIds: ['parent-5'],
        birthDate: '2011-07-18',
        status: 'active',
        enrollmentDate: '2024-02-01'
      },
      {
        id: 'student-6',
        name: 'Sofia Rodrigues',
        email: 'sofia.rodrigues@aluno.edu.br',
        classId: 'class-2',
        schoolId: 'school-1',
        enrollmentNumber: '2024006',
        parentIds: ['parent-6'],
        birthDate: '2011-01-28',
        status: 'active',
        enrollmentDate: '2024-02-01'
      }
    ]

    const samplePerformances: StudentPerformance[] = [
      {
        studentId: 'student-1',
        studentName: 'João Pedro Santos',
        overallAverage: 8.5,
        attendanceRate: 95,
        assignmentsCompleted: 28,
        totalAssignments: 30,
        subjectPerformance: [
          { subject: 'Matemática', average: 9.0, trend: 'up' },
          { subject: 'Português', average: 8.5, trend: 'stable' },
          { subject: 'Ciências', average: 8.0, trend: 'up' },
          { subject: 'História', average: 8.5, trend: 'stable' },
          { subject: 'Geografia', average: 8.8, trend: 'up' }
        ],
        recentAssessments: [
          { assessmentId: 'assess-1', title: 'Prova de Matemática - 1º Bim', score: 9.2, date: '2024-03-15' },
          { assessmentId: 'assess-2', title: 'Avaliação de Português', score: 8.5, date: '2024-03-10' },
          { assessmentId: 'assess-3', title: 'Teste de Ciências', score: 8.0, date: '2024-03-05' }
        ],
        strengths: ['Excelente raciocínio lógico-matemático', 'Participação ativa nas aulas', 'Organização exemplar'],
        improvements: ['Aprimorar interpretação de textos longos', 'Desenvolver apresentações orais']
      },
      {
        studentId: 'student-2',
        studentName: 'Ana Carolina Lima',
        overallAverage: 9.2,
        attendanceRate: 98,
        assignmentsCompleted: 30,
        totalAssignments: 30,
        subjectPerformance: [
          { subject: 'Matemática', average: 9.5, trend: 'up' },
          { subject: 'Português', average: 9.8, trend: 'up' },
          { subject: 'Ciências', average: 9.0, trend: 'stable' },
          { subject: 'História', average: 8.8, trend: 'up' },
          { subject: 'Geografia', average: 9.0, trend: 'stable' }
        ],
        recentAssessments: [
          { assessmentId: 'assess-1', title: 'Prova de Matemática - 1º Bim', score: 9.8, date: '2024-03-15' },
          { assessmentId: 'assess-2', title: 'Avaliação de Português', score: 10.0, date: '2024-03-10' },
          { assessmentId: 'assess-3', title: 'Teste de Ciências', score: 9.0, date: '2024-03-05' }
        ],
        strengths: ['Desempenho excepcional em todas as disciplinas', 'Liderança natural', 'Ajuda colegas'],
        improvements: ['Desenvolver autonomia em projetos', 'Explorar temas de interesse pessoal']
      },
      {
        studentId: 'student-3',
        studentName: 'Lucas Oliveira',
        overallAverage: 7.0,
        attendanceRate: 88,
        assignmentsCompleted: 24,
        totalAssignments: 30,
        subjectPerformance: [
          { subject: 'Matemática', average: 6.5, trend: 'down' },
          { subject: 'Português', average: 7.0, trend: 'stable' },
          { subject: 'Ciências', average: 7.5, trend: 'up' },
          { subject: 'História', average: 7.2, trend: 'stable' },
          { subject: 'Geografia', average: 6.8, trend: 'stable' }
        ],
        recentAssessments: [
          { assessmentId: 'assess-1', title: 'Prova de Matemática - 1º Bim', score: 6.5, date: '2024-03-15' },
          { assessmentId: 'assess-2', title: 'Avaliação de Português', score: 7.0, date: '2024-03-10' },
          { assessmentId: 'assess-3', title: 'Teste de Ciências', score: 7.8, date: '2024-03-05' }
        ],
        strengths: ['Bom desempenho em Ciências', 'Criatividade em projetos'],
        improvements: ['Aumentar frequência e pontualidade', 'Entregar tarefas no prazo', 'Reforço em Matemática']
      },
      {
        studentId: 'student-4',
        studentName: 'Beatriz Costa',
        overallAverage: 8.8,
        attendanceRate: 96,
        assignmentsCompleted: 29,
        totalAssignments: 30,
        subjectPerformance: [
          { subject: 'Matemática', average: 8.5, trend: 'stable' },
          { subject: 'Português', average: 9.2, trend: 'up' },
          { subject: 'Ciências', average: 8.8, trend: 'up' },
          { subject: 'História', average: 9.0, trend: 'up' },
          { subject: 'Geografia', average: 8.5, trend: 'stable' }
        ],
        recentAssessments: [
          { assessmentId: 'assess-4', title: 'Prova de História', score: 9.5, date: '2024-03-18' },
          { assessmentId: 'assess-5', title: 'Avaliação de Português', score: 9.0, date: '2024-03-12' },
          { assessmentId: 'assess-6', title: 'Teste de Matemática', score: 8.5, date: '2024-03-08' }
        ],
        strengths: ['Excelente em humanas', 'Ótima comunicação escrita', 'Comprometimento'],
        improvements: ['Aprofundar conhecimentos em exatas', 'Desenvolver raciocínio lógico']
      },
      {
        studentId: 'student-5',
        studentName: 'Gabriel Ferreira',
        overallAverage: 7.5,
        attendanceRate: 92,
        assignmentsCompleted: 26,
        totalAssignments: 30,
        subjectPerformance: [
          { subject: 'Matemática', average: 7.8, trend: 'up' },
          { subject: 'Português', average: 7.0, trend: 'stable' },
          { subject: 'Ciências', average: 7.5, trend: 'stable' },
          { subject: 'História', average: 7.5, trend: 'up' },
          { subject: 'Geografia', average: 7.8, trend: 'stable' }
        ],
        recentAssessments: [
          { assessmentId: 'assess-4', title: 'Prova de História', score: 7.5, date: '2024-03-18' },
          { assessmentId: 'assess-5', title: 'Avaliação de Português', score: 7.0, date: '2024-03-12' },
          { assessmentId: 'assess-6', title: 'Teste de Matemática', score: 8.0, date: '2024-03-08' }
        ],
        strengths: ['Melhoria constante', 'Bom trabalho em grupo'],
        improvements: ['Completar todas as tarefas', 'Melhorar produção textual']
      },
      {
        studentId: 'student-6',
        studentName: 'Sofia Rodrigues',
        overallAverage: 9.0,
        attendanceRate: 99,
        assignmentsCompleted: 30,
        totalAssignments: 30,
        subjectPerformance: [
          { subject: 'Matemática', average: 9.2, trend: 'up' },
          { subject: 'Português', average: 9.5, trend: 'up' },
          { subject: 'Ciências', average: 8.8, trend: 'stable' },
          { subject: 'História', average: 8.7, trend: 'up' },
          { subject: 'Geografia', average: 8.8, trend: 'stable' }
        ],
        recentAssessments: [
          { assessmentId: 'assess-4', title: 'Prova de História', score: 9.0, date: '2024-03-18' },
          { assessmentId: 'assess-5', title: 'Avaliação de Português', score: 9.8, date: '2024-03-12' },
          { assessmentId: 'assess-6', title: 'Teste de Matemática', score: 9.5, date: '2024-03-08' }
        ],
        strengths: ['Disciplina e organização', 'Alto desempenho em todas as áreas', 'Pontualidade exemplar'],
        improvements: ['Desenvolver trabalhos de pesquisa avançada', 'Participar de olimpíadas acadêmicas']
      }
    ]

    const sampleAttendance: Attendance[] = []
    const today = new Date()
    
    sampleStudents.forEach(student => {
      for (let i = 0; i < 40; i++) {
        const date = new Date(today)
        date.setDate(date.getDate() - i)
        
        if (date.getDay() !== 0 && date.getDay() !== 6) {
          let status: 'present' | 'absent' | 'late' | 'excused' = 'present'
          const random = Math.random()
          
          if (student.id === 'student-3') {
            if (random > 0.88) status = 'absent'
            else if (random > 0.80) status = 'late'
          } else if (random > 0.95) {
            status = random > 0.97 ? 'absent' : 'late'
          }
          
          sampleAttendance.push({
            id: `attendance-${student.id}-${i}`,
            studentId: student.id,
            date: date.toISOString().split('T')[0],
            status
          })
        }
      }
    })

    setStudents(sampleStudents)
    setStudentPerformances(samplePerformances)
    setAttendance(sampleAttendance)

    generateSampleNotifications(sampleStudents, sampleAttendance)
  }

  const generateSampleNotifications = (sampleStudents: Student[], sampleAttendance: Attendance[]) => {
    const notifications: ParentNotification[] = []
    const now = new Date()
    
    const parentStudent1 = sampleStudents.find(s => s.id === 'student-1')
    const parentStudent2 = sampleStudents.find(s => s.id === 'student-2')

    if (parentStudent1) {
      const recentAbsences = sampleAttendance
        .filter(a => a.studentId === 'student-1' && a.status === 'absent')
        .slice(0, 2)
      
      recentAbsences.forEach((absence, index) => {
        const notif = generateAttendanceNotification(absence, parentStudent1, 'user-1')
        if (notif) {
          const timestamp = new Date(now.getTime() - (index + 1) * 24 * 60 * 60 * 1000)
          notifications.push({ ...notif, timestamp: timestamp.toISOString() })
        }
      })

      const gradeNotif1 = generateGradeNotification(
        {
          id: 'grade-1',
          studentId: 'student-1',
          subject: 'Matemática',
          assessmentId: 'assess-1',
          score: 9.2,
          maxScore: 10,
          date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          feedback: 'Excelente desempenho!'
        },
        parentStudent1,
        'user-1',
        'Matemática'
      )
      notifications.push({ 
        ...gradeNotif1, 
        timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() 
      })
    }

    if (parentStudent2) {
      const gradeNotif2 = generateGradeNotification(
        {
          id: 'grade-2',
          studentId: 'student-2',
          subject: 'Português',
          assessmentId: 'assess-2',
          score: 10.0,
          maxScore: 10,
          date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          feedback: 'Perfeito!'
        },
        parentStudent2,
        'user-1',
        'Português'
      )
      notifications.push({ 
        ...gradeNotif2, 
        timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() 
      })

      const gradeNotif3 = generateGradeNotification(
        {
          id: 'grade-3',
          studentId: 'student-2',
          subject: 'Ciências',
          assessmentId: 'assess-3',
          score: 9.0,
          maxScore: 10,
          date: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString(),
          feedback: 'Muito bom trabalho!'
        },
        parentStudent2,
        'user-1',
        'Ciências'
      )
      notifications.push({ 
        ...gradeNotif3, 
        timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString() 
      })
    }

    setParentNotifications(notifications)

    if (currentUser?.role === 'parent' && notifications.length > 0) {
      const unreadCount = notifications.filter(n => !n.read).length
      if (unreadCount > 0) {
        toast.success(`Você tem ${unreadCount} nova${unreadCount > 1 ? 's' : ''} notificaç${unreadCount > 1 ? 'ões' : 'ão'}!`, {
          description: 'Confira atualizações sobre frequência e notas'
        })
      }
    }
  }

  const handleMarkAsRead = (announcementId: string) => {
    setAnnouncements((current) =>
      (current || []).map((a) =>
        a.id === announcementId ? { ...a, read: true } : a
      )
    )
  }

  const handleDismiss = (announcementId: string) => {
    setAnnouncements((current) =>
      (current || []).filter((a) => a.id !== announcementId)
    )
  }

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudentId(studentId)
    setActiveSection('student-profile')
  }

  const handleBackFromProfile = () => {
    setSelectedStudentId(null)
    setActiveSection('students')
  }

  const handleRoleChange = (role: UserRole) => {
    setCurrentUser((current) => ({
      ...current!,
      role
    }))
    setActiveSection('dashboard')
  }

  const handleMarkNotificationAsRead = (notificationId: string) => {
    setParentNotifications((current) =>
      (current || []).map((n) =>
        n.id === notificationId ? { ...n, read: true } : n
      )
    )
  }

  const handleDismissNotification = (notificationId: string) => {
    setParentNotifications((current) =>
      (current || []).filter((n) => n.id !== notificationId)
    )
  }

  const handleSendCustomMessage = (message: Omit<CustomMessage, 'id' | 'timestamp'>) => {
    const customMessage: CustomMessage = {
      ...message,
      id: `custom-msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString()
    }

    setCustomMessages((current) => [customMessage, ...(current || [])])

    message.recipientParentIds.forEach(parentId => {
      const notification = generateCustomMessageNotification(customMessage, parentId)
      setParentNotifications((current) => [notification, ...(current || [])])
    })
  }

  const handleViewAllNotifications = () => {
    setActiveSection('parent-notifications')
  }

  const getParentNotifications = () => {
    if (currentUser?.role === 'parent' && currentUser.id) {
      return (parentNotifications || []).filter(n => n.parentId === currentUser.id)
    }
    return []
  }

  const unreadCount = (announcements || []).filter(a => !a.read).length

  const getParentStudents = () => {
    if (currentUser?.role === 'parent' && currentUser.studentIds) {
      return (students || []).filter(s => currentUser.studentIds?.includes(s.id))
    }
    return []
  }

  const renderContent = () => {
    if (activeSection === 'student-profile' && selectedStudentId) {
      const student = (students || []).find(s => s.id === selectedStudentId)
      const performance = (studentPerformances || []).find(p => p.studentId === selectedStudentId)
      const studentAssessments = (assessmentResults || []).filter(r => r.studentId === selectedStudentId)
      const studentAttendance = (attendance || []).filter(a => a.studentId === selectedStudentId)
      const studentGrades = (grades || []).filter(g => g.studentId === selectedStudentId)

      if (student && performance) {
        return (
          <StudentProfileView
            student={student}
            performance={performance}
            assessmentResults={studentAssessments}
            attendance={studentAttendance}
            grades={studentGrades}
            onBack={handleBackFromProfile}
          />
        )
      }
    }

    switch (activeSection) {
      case 'dashboard':
        if (currentUser?.role === 'parent') {
          return (
            <ParentPortalView
              parentId={currentUser.id}
              students={getParentStudents()}
              studentPerformances={studentPerformances || []}
              assessmentResults={assessmentResults || []}
              attendance={attendance || []}
              announcements={announcements || []}
              notifications={getParentNotifications()}
              onViewAllNotifications={handleViewAllNotifications}
              onMarkNotificationAsRead={handleMarkNotificationAsRead}
            />
          )
        }
        return (
          <DashboardView
            stats={stats || {
              totalStudents: 0,
              totalTeachers: 0,
              totalSchools: 0,
              activeAssessments: 0,
              averagePerformance: 0,
              coursesCompleted: 0,
              pendingNotifications: 0,
              recentActivity: 0
            }}
            announcements={announcements || []}
            onMarkAsRead={handleMarkAsRead}
            onDismiss={handleDismiss}
            onNavigate={setActiveSection}
          />
        )
      case 'students':
        return (
          <StudentsView
            students={students || []}
            studentPerformance={studentPerformances || []}
            onStudentSelect={handleStudentSelect}
          />
        )
      case 'messages':
        return (
          <TeacherMessagingView
            students={students || []}
            currentUser={currentUser || {
              id: 'user-1',
              name: 'Usuário',
              email: 'usuario@escola.edu.br',
              role: 'teacher'
            }}
            sentMessages={customMessages || []}
            onSendMessage={handleSendCustomMessage}
          />
        )
      case 'materials':
        return <MaterialsView materials={materials || []} />
      case 'assessments':
        return <AssessmentsView assessments={assessments || []} results={assessmentResults || []} />
      case 'courses':
        return <CoursesView courses={courses || []} />
      case 'library':
        return <BibliotecaView />
      case 'biblioteca':
        return <BibliotecaView />
      case 'avaliacoes-avancadas':
        return <AvaliacoesAvancadasView />
      case 'cursos':
        return <CursosView />
      case 'formacao':
        return <CursosView />
      case 'educacao-infantil':
        return <EducacaoInfantilView />
      case 'assessoria':
        return <AssessoriaPedagogicaView />
      case 'banco-questoes':
        return <BancoQuestoesView />
      case 'relatorios':
        return <RelatoriosView />
      case 'saeb':
        return <PreparacaoSAEBView />
      case 'alfabetizacao':
        return <ApoioAlfabetizacaoView />
      case 'notifications':
        return (
          <NotificationsView
            announcements={announcements || []}
            onMarkAsRead={handleMarkAsRead}
            onDismiss={handleDismiss}
          />
        )
      case 'parent-notifications':
        return (
          <ParentNotificationsView
            notifications={getParentNotifications()}
            onMarkAsRead={handleMarkNotificationAsRead}
            onDismiss={handleDismissNotification}
          />
        )
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground font-['Space_Grotesk']">
                Em Desenvolvimento
              </h2>
              <p className="text-muted-foreground mt-2">
                Esta seção estará disponível em breve.
              </p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        user={currentUser || {
          id: 'user-1',
          name: 'Usuário',
          email: 'usuario@escola.edu.br',
          role: 'coordinator'
        }}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        notifications={
          currentUser?.role === 'parent'
            ? getParentNotifications().filter(n => !n.read).length
            : unreadCount
        }
        onRoleChange={handleRoleChange}
      />

      <div className="flex">
        <div className="hidden md:block">
          <Sidebar
            user={currentUser || {
              id: 'user-1',
              name: 'Usuário',
              email: 'usuario@escola.edu.br',
              role: 'coordinator'
            }}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        <main className="flex-1 overflow-x-hidden">
          <div className="p-6 md:p-8 pb-24 md:pb-8">
            {renderContent()}
          </div>
        </main>
      </div>

      <MobileNav
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        notifications={
          currentUser?.role === 'parent'
            ? getParentNotifications().filter(n => !n.read).length
            : unreadCount
        }
        userRole={currentUser?.role}
      />

      <Toaster position="top-right" />
    </div>
  )
}

export default App
