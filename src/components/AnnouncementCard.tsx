import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Info, Warning, CheckCircle, X } from '@phosphor-icons/react'
import type { Announcement } from '@/lib/types'
import { motion } from 'framer-motion'

interface AnnouncementCardProps {
  announcement: Announcement
  onMarkAsRead?: (announcementId: string) => void
  onDismiss?: (announcementId: string) => void
}

export function AnnouncementCard({ announcement, onMarkAsRead, onDismiss }: AnnouncementCardProps) {
  const priorityConfig = {
    low: {
      icon: Info,
      variant: 'default' as const,
      badge: 'bg-muted text-muted-foreground'
    },
    medium: {
      icon: Info,
      variant: 'default' as const,
      badge: 'bg-accent text-accent-foreground'
    },
    high: {
      icon: Warning,
      variant: 'destructive' as const,
      badge: 'bg-destructive text-destructive-foreground'
    }
  }

  const config = priorityConfig[announcement.priority]
  const Icon = config.icon

  const priorityLabels = {
    low: 'Baixa',
    medium: 'Média',
    high: 'Alta'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <Alert variant={config.variant} className={`relative ${announcement.read ? 'opacity-60' : ''}`}>
        {onDismiss && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-6 w-6 p-0"
            onClick={() => onDismiss(announcement.id)}
          >
            <X size={14} />
          </Button>
        )}
        
        <Icon size={20} weight="bold" />
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <AlertTitle className="mb-0">{announcement.title}</AlertTitle>
            <Badge className={config.badge}>
              {priorityLabels[announcement.priority]}
            </Badge>
          </div>
          
          <AlertDescription className="text-sm mb-3">
            {announcement.content}
          </AlertDescription>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div>
              <span className="font-medium">{announcement.author}</span>
              <span className="mx-2">•</span>
              <span>{new Date(announcement.date).toLocaleDateString('pt-BR')}</span>
            </div>
            
            {!announcement.read && onMarkAsRead && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onMarkAsRead(announcement.id)}
                className="h-8 text-xs"
              >
                <CheckCircle size={14} weight="bold" />
                Marcar como lido
              </Button>
            )}
          </div>
        </div>
      </Alert>
    </motion.div>
  )
}
