import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { RoleSwitcher } from '@/components/RoleSwitcher'
import {
  House,
  Folders,
  ChartBar,
  GraduationCap,
  Book,
  Bell,
  SignOut,
  User,
  Users,
  PaperPlaneRight,
  BookOpen,
  ChartLine,
  Chalkboard,
  Brain,
  Target,
  Baby,
  FileText
} from '@phosphor-icons/react'
import type { User as UserType, UserRole } from '@/lib/types'

interface SidebarProps {
  user: UserType
  activeSection: string
  onSectionChange: (section: string) => void
  notifications: number
  onRoleChange: (role: UserRole) => void
}

export function Sidebar({ user, activeSection, onSectionChange, notifications, onRoleChange }: SidebarProps) {
  const roleLabels = {
    student: 'Aluno',
    parent: 'Responsável',
    teacher: 'Professor',
    coordinator: 'Coordenador',
    director: 'Diretor',
    secretary: 'Secretaria',
    admin: 'Administrador',
    evaluator: 'Avaliador'
  }

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
    { id: 'relatorios', label: 'Relatórios', icon: FileText, roles: ['coordinator', 'director', 'secretary', 'admin'] }
  ]

  const filteredNavItems = navItems.filter(item => {
    if (!item.roles) return true
    return item.roles.includes(user.role)
  })

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-primary font-['Space_Grotesk']">
          EduSystem
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Sistema Digital de Ensino
        </p>
      </div>

      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user.name}</p>
            <Badge variant="outline" className="text-xs mt-1">
              {roleLabels[user.role]}
            </Badge>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {filteredNavItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          
          return (
            <Button
              key={item.id}
              variant={isActive ? 'default' : 'ghost'}
              className={`w-full justify-start gap-2 ${isActive ? 'shadow-sm' : ''}`}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon size={20} weight={isActive ? 'fill' : 'bold'} className="shrink-0" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.id === 'dashboard' && notifications > 0 && (
                <Badge className="ml-auto bg-accent text-accent-foreground">
                  {notifications}
                </Badge>
              )}
            </Button>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <RoleSwitcher currentRole={user.role} onRoleChange={onRoleChange} />
        
        {user.role === 'parent' ? (
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => onSectionChange('parent-notifications')}
          >
            <Bell size={20} weight="bold" className="shrink-0" />
            <span className="flex-1 text-left">Notificações</span>
            {notifications > 0 && (
              <Badge className="ml-auto bg-accent text-accent-foreground">
                {notifications}
              </Badge>
            )}
          </Button>
        ) : (
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => onSectionChange('notifications')}
          >
            <Bell size={20} weight="bold" className="shrink-0" />
            <span className="flex-1 text-left">Notificações</span>
            {notifications > 0 && (
              <Badge className="ml-auto bg-accent text-accent-foreground">
                {notifications}
              </Badge>
            )}
          </Button>
        )}
        
        <Button
          variant="ghost"
          className="w-full justify-start gap-2"
          onClick={() => onSectionChange('profile')}
        >
          <User size={20} weight="bold" className="shrink-0" />
          <span className="flex-1 text-left">Perfil</span>
        </Button>
        
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <SignOut size={20} weight="bold" className="shrink-0" />
          <span className="flex-1 text-left">Sair</span>
        </Button>
      </div>
    </aside>
  )
}
