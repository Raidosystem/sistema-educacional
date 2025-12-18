import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle,
  Warning,
  TrendUp,
  TrendDown,
  X,
  CalendarX,
  Clock,
  ChartBar,
  ChatCircle
} from '@phosphor-icons/react'
import type { ParentNotification } from '@/lib/types'

interface ParentNotificationCardProps {
  notification: ParentNotification
  onMarkAsRead: (id: string) => void
  onDismiss: (id: string) => void
}

export function ParentNotificationCard({
  notification,
  onMarkAsRead,
  onDismiss
}: ParentNotificationCardProps) {
  const getIcon = () => {
    switch (notification.type) {
      case 'attendance-absence':
        return <CalendarX className="h-5 w-5" weight="fill" />
      case 'attendance-late':
        return <Clock className="h-5 w-5" weight="fill" />
      case 'grade-high':
        return <TrendUp className="h-5 w-5" weight="fill" />
      case 'grade-low':
        return <TrendDown className="h-5 w-5" weight="fill" />
      case 'grade-posted':
        return <ChartBar className="h-5 w-5" weight="fill" />
      case 'custom-message':
        return <ChatCircle className="h-5 w-5" weight="fill" />
      default:
        return <CheckCircle className="h-5 w-5" weight="fill" />
    }
  }

  const getIconColor = () => {
    switch (notification.priority) {
      case 'high':
        return 'text-destructive'
      case 'medium':
        return 'text-accent'
      case 'low':
        return 'text-success'
      default:
        return 'text-primary'
    }
  }

  const getBorderColor = () => {
    switch (notification.priority) {
      case 'high':
        return 'border-l-destructive'
      case 'medium':
        return 'border-l-accent'
      case 'low':
        return 'border-l-success'
      default:
        return 'border-l-primary'
    }
  }

  const getPriorityBadge = () => {
    switch (notification.priority) {
      case 'high':
        return (
          <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive">
            Alta Prioridade
          </Badge>
        )
      case 'medium':
        return (
          <Badge className="bg-accent/10 text-accent-foreground hover:bg-accent/20 border-accent">
            Média Prioridade
          </Badge>
        )
      default:
        return null
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Agora mesmo'
    if (diffMins < 60) return `Há ${diffMins} minuto${diffMins > 1 ? 's' : ''}`
    if (diffHours < 24) return `Há ${diffHours} hora${diffHours > 1 ? 's' : ''}`
    if (diffDays === 1) return 'Ontem'
    if (diffDays < 7) return `Há ${diffDays} dias`
    
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <Card
      className={`border-l-4 ${getBorderColor()} transition-all duration-200 ${
        notification.read ? 'opacity-60' : 'shadow-md'
      }`}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full bg-muted ${getIconColor()}`}>
            {getIcon()}
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-foreground font-['Space_Grotesk']">
                    {notification.title}
                  </h3>
                  {getPriorityBadge()}
                  {!notification.read && (
                    <Badge className="bg-primary text-primary-foreground">Nova</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {notification.studentName}
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                onClick={() => onDismiss(notification.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <p className="text-sm text-foreground leading-relaxed">
              {notification.message}
            </p>

            {notification.relatedData && (
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
                {notification.relatedData.senderName && (
                  <span className="font-medium">
                    👤 {notification.relatedData.senderName}
                  </span>
                )}
                {notification.relatedData.category && (
                  <span className="font-medium">
                    🏷️ {notification.relatedData.category === 'behavioral' ? 'Comportamental' :
                       notification.relatedData.category === 'academic' ? 'Acadêmico' :
                       notification.relatedData.category === 'attendance' ? 'Frequência' :
                       notification.relatedData.category === 'health' ? 'Saúde' : 'Geral'}
                  </span>
                )}
                {notification.relatedData.subject && !notification.relatedData.senderName && (
                  <span className="font-medium">
                    📚 {notification.relatedData.subject}
                  </span>
                )}
                {notification.relatedData.date && (
                  <span>
                    📅 {new Date(notification.relatedData.date).toLocaleDateString('pt-BR')}
                  </span>
                )}
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-muted-foreground">
                {formatTimestamp(notification.timestamp)}
              </span>

              {!notification.read && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onMarkAsRead(notification.id)}
                  className="h-8 text-xs"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Marcar como lida
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
