import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Bell,
  CalendarX,
  Clock,
  ChartBar,
  TrendUp,
  TrendDown,
  CaretRight
} from '@phosphor-icons/react'
import type { ParentNotification } from '@/lib/types'

interface NotificationPanelProps {
  notifications: ParentNotification[]
  onViewAll: () => void
  onMarkAsRead: (id: string) => void
}

export function NotificationPanel({
  notifications,
  onViewAll,
  onMarkAsRead
}: NotificationPanelProps) {
  const unreadNotifications = notifications
    .filter(n => !n.read)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5)

  const getIcon = (type: ParentNotification['type']) => {
    switch (type) {
      case 'attendance-absence':
        return <CalendarX className="h-4 w-4" weight="fill" />
      case 'attendance-late':
        return <Clock className="h-4 w-4" weight="fill" />
      case 'grade-high':
        return <TrendUp className="h-4 w-4" weight="fill" />
      case 'grade-low':
        return <TrendDown className="h-4 w-4" weight="fill" />
      case 'grade-posted':
        return <ChartBar className="h-4 w-4" weight="fill" />
      default:
        return <Bell className="h-4 w-4" weight="fill" />
    }
  }

  const getIconColor = (priority: ParentNotification['priority']) => {
    switch (priority) {
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

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)

    if (diffMins < 1) return 'Agora'
    if (diffMins < 60) return `${diffMins}m`
    if (diffHours < 24) return `${diffHours}h`
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" weight="fill" />
              Notificações Recentes
            </CardTitle>
            <CardDescription>
              Atualizações sobre frequência e desempenho
            </CardDescription>
          </div>
          {unreadNotifications.length > 0 && (
            <Badge className="bg-destructive text-destructive-foreground">
              {unreadNotifications.length}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {unreadNotifications.length > 0 ? (
          <>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {unreadNotifications.map((notification, index) => (
                  <div key={notification.id}>
                    <div
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => onMarkAsRead(notification.id)}
                    >
                      <div className={`p-2 rounded-full bg-muted ${getIconColor(notification.priority)}`}>
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-sm font-semibold text-foreground leading-tight">
                            {notification.title}
                          </h4>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatTime(notification.timestamp)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {notification.studentName}
                        </p>
                        <p className="text-xs text-foreground line-clamp-2 leading-relaxed">
                          {notification.message}
                        </p>
                      </div>
                    </div>
                    {index < unreadNotifications.length - 1 && (
                      <Separator className="my-2" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Button
              variant="outline"
              className="w-full"
              onClick={onViewAll}
            >
              Ver todas as notificações
              <CaretRight className="h-4 w-4 ml-2" />
            </Button>
          </>
        ) : (
          <div className="py-12 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 rounded-full bg-muted">
                <Bell className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Tudo em dia!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Nenhuma notificação não lida
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
