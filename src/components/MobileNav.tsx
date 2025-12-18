import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  House,
  ChartBar,
  GraduationCap,
  Book,
  Bell,
  Users,
  PaperPlaneRight
} from '@phosphor-icons/react'

interface MobileNavProps {
  activeSection: string
  onSectionChange: (section: string) => void
  notifications: number
  userRole?: string
}

export function MobileNav({ activeSection, onSectionChange, notifications, userRole }: MobileNavProps) {
  const navItems = [
    { id: 'dashboard', label: 'Início', icon: House },
    { id: 'students', label: 'Alunos', icon: Users, roles: ['coordinator', 'teacher', 'director', 'admin'] },
    { id: 'messages', label: 'Mensagens', icon: PaperPlaneRight, roles: ['teacher', 'coordinator', 'director', 'admin'] },
    { id: 'materials', label: 'Materiais', icon: Book },
    { id: 'assessments', label: 'Avaliações', icon: ChartBar },
    { id: 'parent-notifications', label: 'Notificações', icon: Bell, roles: ['parent'] },
    { id: 'notifications', label: 'Avisos', icon: Bell, roles: ['coordinator', 'teacher', 'director', 'admin', 'secretary', 'student'] }
  ]

  const filteredNavItems = navItems.filter(item => {
    if (!item.roles) return true
    if (!userRole) return true
    return item.roles.includes(userRole)
  }).slice(0, 5)

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 md:hidden">
      <div className="flex items-center justify-around p-2">
        {filteredNavItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          const hasNotifications = item.id === 'notifications' && notifications > 0
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
              onClick={() => onSectionChange(item.id)}
            >
              <div className="relative">
                <Icon size={24} weight={isActive ? 'fill' : 'bold'} />
                {hasNotifications && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent text-accent-foreground">
                    {notifications}
                  </Badge>
                )}
              </div>
              <span className="text-xs">{item.label}</span>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}
