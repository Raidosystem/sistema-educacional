import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { User } from '@phosphor-icons/react'
import type { UserRole } from '@/lib/types'

interface RoleSwitcherProps {
  currentRole: UserRole
  onRoleChange: (role: UserRole) => void
}

export function RoleSwitcher({ currentRole, onRoleChange }: RoleSwitcherProps) {
  const roles: { role: UserRole; label: string; description: string }[] = [
    { role: 'student', label: 'Aluno', description: 'Acesso a conteúdos e atividades' },
    { role: 'parent', label: 'Responsável', description: 'Acompanhamento dos filhos' },
    { role: 'teacher', label: 'Professor', description: 'Gestão de turmas e avaliações' },
    { role: 'coordinator', label: 'Coordenador', description: 'Gestão pedagógica completa' },
    { role: 'director', label: 'Diretor', description: 'Gestão escolar e relatórios' },
    { role: 'secretary', label: 'Secretaria', description: 'Administração educacional' },
    { role: 'admin', label: 'Administrador', description: 'Acesso completo ao sistema' },
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <User size={16} weight="bold" />
          Trocar Perfil
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecionar Perfil de Usuário</DialogTitle>
          <DialogDescription>
            Escolha um perfil para visualizar o sistema com diferentes permissões
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 py-4">
          {roles.map(({ role, label, description }) => (
            <Button
              key={role}
              variant={currentRole === role ? 'default' : 'outline'}
              className="w-full justify-start h-auto p-4"
              onClick={() => onRoleChange(role)}
            >
              <div className="text-left flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{label}</span>
                  {currentRole === role && (
                    <Badge variant="secondary" className="text-xs">Atual</Badge>
                  )}
                </div>
                <p className="text-xs opacity-80 mt-1">{description}</p>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
