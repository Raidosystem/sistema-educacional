import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ArrowLeft,
  GraduationCap,
  ChartBar,
  Calendar,
  CheckCircle,
  TrendUp,
  TrendDown,
  Minus,
  BookOpen,
  User,
  EnvelopeSimple,
  IdentificationCard
} from '@phosphor-icons/react'
import type { Student, StudentPerformance, AssessmentResult, Attendance, Grade } from '@/lib/types'

interface StudentProfileViewProps {
  student: Student
  performance: StudentPerformance
  assessmentResults: AssessmentResult[]
  attendance: Attendance[]
  grades: Grade[]
  onBack: () => void
}

export function StudentProfileView({
  student,
  performance,
  assessmentResults,
  attendance,
  grades,
  onBack
}: StudentProfileViewProps) {
  const getAttendanceStats = () => {
    const total = attendance.length
    const present = attendance.filter(a => a.status === 'present').length
    const absent = attendance.filter(a => a.status === 'absent').length
    const late = attendance.filter(a => a.status === 'late').length
    const excused = attendance.filter(a => a.status === 'excused').length
    
    return { total, present, absent, late, excused }
  }

  const attendanceStats = getAttendanceStats()

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendUp size={20} weight="bold" className="text-success" />
      case 'down':
        return <TrendDown size={20} weight="bold" className="text-destructive" />
      case 'stable':
        return <Minus size={20} weight="bold" className="text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft size={24} weight="bold" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground font-['Space_Grotesk']">
            Perfil do Aluno
          </h1>
          <p className="text-muted-foreground mt-1">
            Visualização completa de desempenho e informações
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {student.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{student.name}</CardTitle>
              <CardDescription className="mt-1">
                Matrícula: {student.enrollmentNumber}
              </CardDescription>
              <Badge className="mt-3 bg-success text-success-foreground">
                Ativo
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Separator />
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <EnvelopeSimple size={20} weight="bold" className="text-muted-foreground" />
                <span className="truncate">{student.email}</span>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <Calendar size={20} weight="bold" className="text-muted-foreground" />
                <span>Data de Matrícula: {student.enrollmentDate}</span>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <IdentificationCard size={20} weight="bold" className="text-muted-foreground" />
                <span>Data de Nascimento: {student.birthDate}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Informações Acadêmicas</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Média Geral</span>
                  <span className="font-bold text-primary">{performance.overallAverage.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frequência</span>
                  <span className="font-bold">{performance.attendanceRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tarefas Completas</span>
                  <span className="font-bold">
                    {performance.assignmentsCompleted}/{performance.totalAssignments}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <GraduationCap size={24} weight="bold" className="text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{performance.overallAverage.toFixed(1)}</p>
                    <p className="text-xs text-muted-foreground">Média Geral</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-success/10 rounded-lg">
                    <CheckCircle size={24} weight="bold" className="text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{performance.attendanceRate}%</p>
                    <p className="text-xs text-muted-foreground">Frequência</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <BookOpen size={24} weight="bold" className="text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{performance.assignmentsCompleted}</p>
                    <p className="text-xs text-muted-foreground">Tarefas Completas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="performance" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="performance">Desempenho</TabsTrigger>
              <TabsTrigger value="assessments">Avaliações</TabsTrigger>
              <TabsTrigger value="attendance">Frequência</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Desempenho por Disciplina</CardTitle>
                  <CardDescription>
                    Acompanhe o progresso em cada matéria
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {performance.subjectPerformance.map((subject) => (
                    <div key={subject.subject} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{subject.subject}</span>
                          {getTrendIcon(subject.trend)}
                        </div>
                        <span className="text-lg font-bold text-primary">
                          {subject.average.toFixed(1)}
                        </span>
                      </div>
                      <Progress value={subject.average * 10} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assessments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Avaliações Recentes</CardTitle>
                  <CardDescription>
                    Histórico de avaliações realizadas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {performance.recentAssessments.map((assessment) => (
                    <div
                      key={assessment.assessmentId}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{assessment.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(assessment.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">
                          {assessment.score.toFixed(1)}
                        </p>
                        <p className="text-xs text-muted-foreground">Nota</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Estatísticas de Frequência</CardTitle>
                  <CardDescription>
                    Registro de presença e ausências
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-success/10 rounded-lg">
                      <p className="text-2xl font-bold text-success">{attendanceStats.present}</p>
                      <p className="text-xs text-muted-foreground mt-1">Presentes</p>
                    </div>
                    <div className="text-center p-4 bg-destructive/10 rounded-lg">
                      <p className="text-2xl font-bold text-destructive">{attendanceStats.absent}</p>
                      <p className="text-xs text-muted-foreground mt-1">Faltas</p>
                    </div>
                    <div className="text-center p-4 bg-accent/10 rounded-lg">
                      <p className="text-2xl font-bold text-accent">{attendanceStats.late}</p>
                      <p className="text-xs text-muted-foreground mt-1">Atrasos</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-2xl font-bold">{attendanceStats.excused}</p>
                      <p className="text-xs text-muted-foreground mt-1">Justificadas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Pontos Fortes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {performance.strengths.map((strength, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle size={20} weight="fill" className="text-success mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{strength}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Áreas de Melhoria</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {performance.improvements.map((improvement, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <TrendUp size={20} weight="bold" className="text-accent mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{improvement}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
