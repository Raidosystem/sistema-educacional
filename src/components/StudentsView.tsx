import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  MagnifyingGlass,
  Plus,
  Funnel,
  CaretRight,
  GraduationCap,
  TrendUp,
  TrendDown,
  CheckCircle
} from '@phosphor-icons/react'
import type { Student, StudentPerformance } from '@/lib/types'

interface StudentsViewProps {
  students: Student[]
  studentPerformance: StudentPerformance[]
  onStudentSelect: (studentId: string) => void
}

export function StudentsView({ students, studentPerformance, onStudentSelect }: StudentsViewProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterClass, setFilterClass] = useState<string>('all')

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.enrollmentNumber.includes(searchQuery)
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getPerformanceForStudent = (studentId: string) => {
    return studentPerformance.find(p => p.studentId === studentId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground'
      case 'inactive':
        return 'bg-muted text-muted-foreground'
      case 'transferred':
        return 'bg-secondary text-secondary-foreground'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo'
      case 'inactive':
        return 'Inativo'
      case 'transferred':
        return 'Transferido'
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-['Space_Grotesk']">
            Gestão de Alunos
          </h1>
          <p className="text-muted-foreground mt-2">
            Gerencie alunos e acompanhe desempenho individual
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={20} weight="bold" />
              Adicionar Aluno
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Aluno</DialogTitle>
              <DialogDescription>
                Preencha os dados do aluno para cadastro no sistema
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <p className="text-sm text-muted-foreground">
                Formulário de cadastro em desenvolvimento
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros e Busca</CardTitle>
          <CardDescription>Encontre alunos por nome, matrícula ou filtros</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlass 
                size={20} 
                weight="bold" 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Buscar por nome ou matrícula..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
                <SelectItem value="transferred">Transferidos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => {
          const performance = getPerformanceForStudent(student.id)
          
          return (
            <Card 
              key={student.id} 
              className="hover:shadow-lg transition-all cursor-pointer hover:-translate-y-1"
              onClick={() => onStudentSelect(student.id)}
            >
              <CardHeader>
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {student.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base truncate">{student.name}</CardTitle>
                    <CardDescription className="text-xs">
                      Matrícula: {student.enrollmentNumber}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(student.status)} variant="secondary">
                    {getStatusLabel(student.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {performance ? (
                  <>
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2">
                        <GraduationCap size={20} weight="bold" className="text-primary" />
                        <span className="text-sm font-medium">Média Geral</span>
                      </div>
                      <span className="text-lg font-bold text-primary">
                        {performance.overallAverage.toFixed(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-2 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground">Frequência</p>
                        <p className="text-sm font-bold">{performance.attendanceRate}%</p>
                      </div>
                      <div className="text-center p-2 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground">Tarefas</p>
                        <p className="text-sm font-bold">
                          {performance.assignmentsCompleted}/{performance.totalAssignments}
                        </p>
                      </div>
                    </div>

                    {performance.subjectPerformance.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">
                          Desempenho por Matéria
                        </p>
                        {performance.subjectPerformance.slice(0, 3).map((subject) => (
                          <div key={subject.subject} className="flex items-center justify-between text-sm">
                            <span className="truncate flex-1">{subject.subject}</span>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{subject.average.toFixed(1)}</span>
                              {subject.trend === 'up' && (
                                <TrendUp size={16} weight="bold" className="text-success" />
                              )}
                              {subject.trend === 'down' && (
                                <TrendDown size={16} weight="bold" className="text-destructive" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-4 text-muted-foreground text-sm">
                    Sem dados de desempenho
                  </div>
                )}
                
                <Button variant="outline" className="w-full" onClick={() => onStudentSelect(student.id)}>
                  Ver Perfil Completo
                  <CaretRight size={16} weight="bold" />
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <GraduationCap size={48} weight="bold" className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum aluno encontrado</h3>
            <p className="text-muted-foreground text-sm">
              Tente ajustar os filtros ou realizar uma nova busca
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
