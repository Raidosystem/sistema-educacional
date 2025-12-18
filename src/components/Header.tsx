import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { RoleSwitcher } from '@/components/RoleSwitcher'
import {
  Bell,
  SignOut,
  User
} from '@phosphor-icons/react'
import type { User as UserType, UserRole } from '@/lib/types'

interface HeaderProps {
  user: UserType
  activeSection: string
  onSectionChange: (section: string) => void
  notifications: number
  onRoleChange: (role: UserRole) => void
}

export function Header({ user, activeSection, onSectionChange, notifications, onRoleChange }: HeaderProps) {
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

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-primary font-['Space_Grotesk']">
            EduSystem
          </h1>
          <p className="text-xs text-muted-foreground">
            Sistema Digital de Ensino
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/30">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{user.name}</p>
            <Badge variant="outline" className="text-xs">
              {roleLabels[user.role]}
            </Badge>
          </div>
        </div>

        <RoleSwitcher currentRole={user.role} onRoleChange={onRoleChange} />

        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => onSectionChange(user.role === 'parent' ? 'parent-notifications' : 'notifications')}
        >
          <Bell size={20} weight="bold" />
          {notifications > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent text-accent-foreground">
              {notifications}
            </Badge>
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onSectionChange('profile')}
        >
          <User size={20} weight="bold" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive hover:bg-destructive/10"
        >
          <SignOut size={20} weight="bold" />
        </Button>
      </div>
    </header>
  )
}
