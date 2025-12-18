import { StatCard } from '@/components/StatCard'
import { AnnouncementCard } from '@/components/AnnouncementCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  GraduationCap,
  Users,
  Buildings,
  ChartBar,
  TrendUp,
  CheckCircle,
  ArrowRight
} from '@phosphor-icons/react'
import type { DashboardStats, Announcement } from '@/lib/types'

interface DashboardViewProps {
  stats: DashboardStats
  announcements: Announcement[]
  onMarkAsRead: (id: string) => void
  onDismiss: (id: string) => void
  onNavigate: (section: string) => void
}

export function DashboardView({ 
  stats, 
  announcements, 
  onMarkAsRead, 
  onDismiss,
  onNavigate 
}: DashboardViewProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground font-['Space_Grotesk']">
          Painel de Controle
        </h1>
        <p className="text-muted-foreground mt-2">
          Visão geral do sistema educacional
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Alunos"
          value={stats.totalStudents.toLocaleString()}
          trend={{ direction: 'up', value: '+12% este mês' }}
          icon={<GraduationCap size={24} weight="bold" />}
          accentColor="primary"
        />
        <StatCard
          title="Professores"
          value={stats.totalTeachers}
          trend={{ direction: 'up', value: '+3 novos' }}
          icon={<Users size={24} weight="bold" />}
          accentColor="accent"
        />
        <StatCard
          title="Escolas da Rede"
          value={stats.totalSchools}
          trend={{ direction: 'neutral', value: 'Estável' }}
          icon={<Buildings size={24} weight="bold" />}
          accentColor="success"
        />
        <StatCard
          title="Desempenho Médio"
          value={`${stats.averagePerformance}%`}
          trend={{ direction: 'up', value: '+5% vs. anterior' }}
          icon={<ChartBar size={24} weight="bold" />}
          accentColor="secondary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendUp size={24} weight="bold" className="text-primary" />
              Atividades Recentes
            </CardTitle>
            <CardDescription>
              Acompanhe as principais métricas de atividade
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Avaliações Ativas</span>
                <span className="text-primary font-bold">{stats.activeAssessments}</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Cursos Concluídos</span>
                <span className="text-success font-bold">{stats.coursesCompleted}</span>
              </div>
              <Progress value={stats.coursesCompleted} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Taxa de Participação</span>
                <span className="text-accent font-bold">87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>

            <div className="pt-4 flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => onNavigate('assessments')}
              >
                Ver Avaliações
                <ArrowRight size={16} weight="bold" />
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => onNavigate('courses')}
              >
                Ver Cursos
                <ArrowRight size={16} weight="bold" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle size={24} weight="bold" className="text-success" />
              Conquistas
            </CardTitle>
            <CardDescription>
              Marcos alcançados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <div className="p-2 bg-success rounded-lg text-success-foreground">
                <CheckCircle size={20} weight="fill" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">100% de Frequência</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Todas as escolas registraram presença
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <div className="p-2 bg-primary rounded-lg text-primary-foreground">
                <TrendUp size={20} weight="fill" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Melhoria Contínua</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Desempenho crescente há 3 meses
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <div className="p-2 bg-accent rounded-lg text-accent-foreground">
                <GraduationCap size={20} weight="fill" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">Formação Completa</p>
                <p className="text-xs text-muted-foreground mt-1">
                  95% dos professores capacitados
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-['Space_Grotesk']">
            Comunicados e Avisos
          </h2>
          <Button variant="outline" onClick={() => onNavigate('notifications')}>
            Ver Todos
            <ArrowRight size={16} weight="bold" />
          </Button>
        </div>
        
        <div className="space-y-4">
          {announcements.slice(0, 3).map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              onMarkAsRead={onMarkAsRead}
              onDismiss={onDismiss}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
