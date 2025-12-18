import { Button } from '@/components/ui/button'
import {
  House,
  Folders,
  ChartBar,
  GraduationCap,
  Book,
  Users,
  PaperPlaneRight,
  BookOpen,
  ChartLine,
  Chalkboard,
  Brain,
  Target,
  Baby,
  FileText,
  Lifebuoy
} from '@phosphor-icons/react'
import type { User as UserType } from '@/lib/types'

interface SidebarProps {
  user: UserType
  activeSection: string
  onSectionChange: (section: string) => void
}

export function Sidebar({ user, activeSection, onSectionChange }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Início', icon: House },
    { id: 'students', label: 'Alunos', icon: Users, roles: ['coordinator', 'teacher', 'director', 'admin'] },
    { id: 'messages', label: 'Mensagens', icon: PaperPlaneRight, roles: ['teacher', 'coordinator', 'director', 'admin'] },
    { id: 'materials', label: 'Materiais', icon: Book },
    { id: 'library', label: 'Biblioteca', icon: Folders },
    { id: 'assessments', label: 'Avaliações', icon: ChartBar },
    { id: 'avaliacoes-avancadas', label: 'Avaliações TRI', icon: ChartLine },
    { id: 'banco-questoes', label: 'Banco de Questões', icon: BookOpen },
    { id: 'courses', label: 'Cursos', icon: GraduationCap },
    { id: 'formacao', label: 'Formação Continuada', icon: GraduationCap },
    { id: 'educacao-infantil', label: 'Educação Infantil', icon: Baby },
    { id: 'alfabetizacao', label: 'Apoio à Alfabetização', icon: Brain },
    { id: 'saeb', label: 'Preparação SAEB', icon: Target },
    { id: 'assessoria', label: 'Assessoria Pedagógica', icon: Chalkboard },
    { id: 'relatorios', label: 'Relatórios', icon: FileText, roles: ['coordinator', 'director', 'secretary', 'admin'] },
    { id: 'suporte', label: 'Ajuda e Suporte', icon: Lifebuoy }
  ]

  const filteredNavItems = navItems.filter(item => {
    if (!item.roles) return true
    return item.roles.includes(user.role)
  })

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-[calc(100vh-4rem)] sticky top-16">
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {filteredNavItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          
          return (
            <Button
              key={item.id}
              variant={isActive ? 'default' : 'ghost'}
              className={`w-full justify-start gap-3 h-10 ${isActive ? 'shadow-sm' : ''}`}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon size={18} weight={isActive ? 'fill' : 'regular'} className="shrink-0" />
              <span className="text-sm">{item.label}</span>
            </Button>
          )
        })}
      </nav>
    </aside>
  )
}
