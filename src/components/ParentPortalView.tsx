import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { NotificationPanel } from '@/components/NotificationPanel'
import {
  GraduationCap,
  ChartBar,
  Calendar,
  CheckCircle,
  TrendUp,
  TrendDown,
  BookOpen,
  Bell,
  Users,
  CaretRight
} from '@phosphor-icons/react'
import type { Student, StudentPerformance, AssessmentResult, Attendance, Announcement, ParentNotification } from '@/lib/types'

interface ParentPortalViewProps {
  parentId: string
  students: Student[]
  studentPerformances: StudentPerformance[]
  assessmentResults: AssessmentResult[]
  attendance: Attendance[]
  announcements: Announcement[]
  notifications: ParentNotification[]
  onViewAllNotifications: () => void
  onMarkNotificationAsRead: (id: string) => void
}

export function ParentPortalView({
  parentId,
  students,
  studentPerformances,
  assessmentResults,
  attendance,
  announcements,
  notifications,
  onViewAllNotifications,
  onMarkNotificationAsRead
}: ParentPortalViewProps) {
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    students.length > 0 ? students[0].id : ''
  )

  const selectedStudent = students.find(s => s.id === selectedStudentId)
  const selectedPerformance = studentPerformances.find(p => p.studentId === selectedStudentId)
  const studentAttendance = attendance.filter(a => a.studentId === selectedStudentId)
  const studentAssessments = assessmentResults.filter(r => r.studentId === selectedStudentId)

  const getAttendanceRate = (studentId: string) => {
    const studentAtt = attendance.filter(a => a.studentId === studentId)
    if (studentAtt.length === 0) return 0
    const present = studentAtt.filter(a => a.status === 'present').length
    return Math.round((present / studentAtt.length) * 100)
  }

  const recentAnnouncements = announcements
    .filter(a => a.targetRoles.includes('parent'))
    .slice(0, 3)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground font-['Space_Grotesk']">
          Portal da Família
        </h1>
        <p className="text-muted-foreground mt-2">
          Acompanhe o desempenho e atividades dos seus filhos
        </p>
      </div>

      {students.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Meus Filhos</CardTitle>
            <CardDescription>Selecione um estudante para visualizar detalhes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {students.map((student) => {
                const performance = studentPerformances.find(p => p.studentId === student.id)
                const isSelected = selectedStudentId === student.id
                
                return (
                  <Button
                    key={student.id}
                    variant={isSelected ? 'default' : 'outline'}
                    className={`h-auto p-4 justify-start ${isSelected ? 'shadow-md' : ''}`}
                    onClick={() => setSelectedStudentId(student.id)}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className={isSelected ? 'bg-primary-foreground text-primary' : 'bg-primary text-primary-foreground'}>
                          {student.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left">
                        <p className="font-semibold">{student.name}</p>
                        <p className="text-xs opacity-80">
                          Média: {performance?.overallAverage.toFixed(1) || 'N/A'}
                        </p>
                      </div>
                      <CaretRight size={20} weight="bold" />
                    </div>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedStudent && selectedPerformance && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <GraduationCap size={24} weight="bold" className="text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{selectedPerformance.overallAverage.toFixed(1)}</p>
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
                    <p className="text-2xl font-bold">{selectedPerformance.attendanceRate}%</p>
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
                    <p className="text-2xl font-bold">{selectedPerformance.assignmentsCompleted}</p>
                    <p className="text-xs text-muted-foreground">Tarefas Completas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-secondary/10 rounded-lg">
                    <ChartBar size={24} weight="bold" className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{selectedPerformance.recentAssessments.length}</p>
                    <p className="text-xs text-muted-foreground">Avaliações</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Desempenho por Disciplina</CardTitle>
                  <CardDescription>
                    Acompanhe as notas em cada matéria
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedPerformance.subjectPerformance.map((subject) => (
                    <div key={subject.subject} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{subject.subject}</span>
                          {subject.trend === 'up' && (
                            <TrendUp size={20} weight="bold" className="text-success" />
                          )}
                          {subject.trend === 'down' && (
                            <TrendDown size={20} weight="bold" className="text-destructive" />
                          )}
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

              <Card>
                <CardHeader>
                  <CardTitle>Avaliações Recentes</CardTitle>
                  <CardDescription>
                    Últimas notas obtidas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedPerformance.recentAssessments.length > 0 ? (
                    selectedPerformance.recentAssessments.map((assessment) => (
                      <div
                        key={assessment.assessmentId}
                        className="flex items-center justify-between p-4 bg-muted rounded-lg"
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
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-4">
                      Nenhuma avaliação recente
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle size={24} weight="bold" className="text-success" />
                    Pontos Fortes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedPerformance.strengths.map((strength, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle size={18} weight="fill" className="text-success mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{strength}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendUp size={24} weight="bold" className="text-accent" />
                    Áreas de Melhoria
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedPerformance.improvements.map((improvement, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <TrendUp size={18} weight="bold" className="text-accent mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{improvement}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <NotificationPanel
                notifications={notifications}
                onViewAll={onViewAllNotifications}
                onMarkAsRead={onMarkNotificationAsRead}
              />
            </div>
          </div>
        </>
      )}

      {students.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Users size={48} weight="bold" className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum estudante vinculado</h3>
            <p className="text-muted-foreground text-sm">
              Entre em contato com a coordenação para vincular estudantes
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
