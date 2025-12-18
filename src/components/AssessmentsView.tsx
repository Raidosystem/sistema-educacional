import { useState } from 'react'
import { AssessmentCard } from '@/components/AssessmentCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Progress } from '@/components/ui/progress'
import { Funnel, Download, TrendUp, TrendDown } from '@phosphor-icons/react'
import type { Assessment, AssessmentResult } from '@/lib/types'
import { toast } from 'sonner'

interface AssessmentsViewProps {
  assessments: Assessment[]
  results: AssessmentResult[]
}

export function AssessmentsView({ assessments, results }: AssessmentsViewProps) {
  const [filterPeriod, setFilterPeriod] = useState<string>('all')
  const [filterSubject, setFilterSubject] = useState<string>('all')
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null)

  const filteredAssessments = assessments.filter((assessment) => {
    const matchesSubject = filterSubject === 'all' || assessment.subject === filterSubject
    return matchesSubject
  })

  const handleExportReport = () => {
    toast.success('Relatório exportado com sucesso!')
  }

  const handleAssessmentClick = (assessmentId: string) => {
    setSelectedAssessment(assessmentId)
    toast.info('Carregando detalhes da avaliação...')
  }

  const topPerformers = results
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-['Space_Grotesk']">
            Plataforma de Avaliações
          </h1>
          <p className="text-muted-foreground mt-2">
            Resultados, relatórios e análises de desempenho
          </p>
        </div>
        <Button onClick={handleExportReport}>
          <Download size={20} weight="bold" />
          Exportar Relatório
        </Button>
      </div>

      <div className="bg-card p-6 rounded-lg border border-border">
        <div className="flex items-center gap-2 text-muted-foreground mb-4">
          <Funnel size={20} weight="bold" />
          <span className="font-medium">Filtros de Visualização</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={filterPeriod} onValueChange={setFilterPeriod}>
            <SelectTrigger>
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Períodos</SelectItem>
              <SelectItem value="current">Período Atual</SelectItem>
              <SelectItem value="lastMonth">Último Mês</SelectItem>
              <SelectItem value="lastQuarter">Último Trimestre</SelectItem>
              <SelectItem value="lastYear">Último Ano</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterSubject} onValueChange={setFilterSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Disciplina" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Disciplinas</SelectItem>
              <SelectItem value="Matemática">Matemática</SelectItem>
              <SelectItem value="Português">Português</SelectItem>
              <SelectItem value="Ciências">Ciências</SelectItem>
              <SelectItem value="História">História</SelectItem>
              <SelectItem value="Geografia">Geografia</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Turma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Turmas</SelectItem>
              <SelectItem value="7a">7º Ano A</SelectItem>
              <SelectItem value="7b">7º Ano B</SelectItem>
              <SelectItem value="8a">8º Ano A</SelectItem>
              <SelectItem value="9a">9º Ano A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="assessments">Avaliações</TabsTrigger>
          <TabsTrigger value="students">Alunos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Desempenho por Disciplina</CardTitle>
                <CardDescription>Média de acertos por área do conhecimento</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { subject: 'Matemática', score: 78, trend: 'up' },
                  { subject: 'Português', score: 82, trend: 'up' },
                  { subject: 'Ciências', score: 75, trend: 'down' },
                  { subject: 'História', score: 85, trend: 'up' },
                  { subject: 'Geografia', score: 80, trend: 'up' }
                ].map((item) => (
                  <div key={item.subject} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.subject}</span>
                      <div className="flex items-center gap-2">
                        {item.trend === 'up' ? (
                          <TrendUp size={16} weight="bold" className="text-success" />
                        ) : (
                          <TrendDown size={16} weight="bold" className="text-destructive" />
                        )}
                        <span className="font-bold">{item.score}%</span>
                      </div>
                    </div>
                    <Progress value={item.score} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Melhores Desempenhos</CardTitle>
                <CardDescription>Top 5 estudantes com maior pontuação</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPerformers.map((result, index) => (
                    <div key={result.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        index === 0 ? 'bg-accent text-accent-foreground' : 'bg-primary text-primary-foreground'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">Aluno {result.studentId.slice(0, 8)}</p>
                        <p className="text-xs text-muted-foreground">
                          {result.correctAnswers}/{result.totalQuestions} acertos
                        </p>
                      </div>
                      <span className="font-bold text-success">{result.score}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Estatísticas Consolidadas</CardTitle>
              <CardDescription>Resumo geral dos resultados das avaliações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary font-['Space_Grotesk']">
                    {assessments.length}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Avaliações Aplicadas
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-success font-['Space_Grotesk']">
                    {results.length}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Participações
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-accent font-['Space_Grotesk']">
                    78%
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Média Geral
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-secondary font-['Space_Grotesk']">
                    92%
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Taxa de Participação
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssessments.map((assessment) => (
              <AssessmentCard
                key={assessment.id}
                assessment={assessment}
                onClick={handleAssessmentClick}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="students" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Relatório Individual de Alunos</CardTitle>
              <CardDescription>Desempenho detalhado por estudante</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aluno</TableHead>
                    <TableHead>Avaliações</TableHead>
                    <TableHead>Média</TableHead>
                    <TableHead>Tendência</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.slice(0, 10).map((result) => (
                    <TableRow key={result.id}>
                      <TableCell className="font-medium">
                        Aluno {result.studentId.slice(0, 8)}
                      </TableCell>
                      <TableCell>{result.totalQuestions}</TableCell>
                      <TableCell>
                        <span className={`font-bold ${
                          result.score >= 70 ? 'text-success' : 
                          result.score >= 50 ? 'text-accent' : 
                          'text-destructive'
                        }`}>
                          {result.score}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <TrendUp size={16} weight="bold" className="text-success" />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Ver Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
